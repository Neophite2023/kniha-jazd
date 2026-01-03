
import { GoogleGenAI, Type } from "@google/genai";
import { Trip, AppSettings } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDrivingInsights = async (trips: Trip[], settings: AppSettings) => {
  if (trips.length === 0) return "Pridajte svoju prvú jazdu, aby som vám mohol poskytnúť analýzu.";

  const summary = trips.slice(0, 5).map(t => 
    `Dátum: ${t.date}, Vzdialenosť: ${t.distanceKm}km, Cena: ${t.totalCost.toFixed(2)}€`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyzuj túto históriu jázd (posledných 5):
      ${summary}
      Aktuálna spotreba auta: ${settings.averageConsumption} L/100km.
      Aktuálna cena benzínu: ${settings.fuelPrice} €/L.
      Povedz mi v 2-3 vetách v slovenčine, či sú tieto náklady primerané a daj mi jeden tip na šetrenie palivom.`,
    });
    // Use .text property to get the generated text content
    return response.text || "Nepodarilo sa vygenerovať analýzu.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analýza momentálne nie je k dispozícii.";
  }
};
