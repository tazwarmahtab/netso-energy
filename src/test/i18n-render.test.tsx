import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { ConversionBand } from "@/components/home/ConversionBand";
import { SolarCalculatorFunnel } from "@/components/home/SolarCalculatorFunnel";
import { LanguageProvider } from "@/lib/i18n";

function renderInBangla(ui: ReactNode) {
  window.localStorage.setItem("netso-language", "bn");

  return render(
    <MemoryRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>,
  );
}

describe("bengali copy", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("renders bengali section copy from the shared copy layer", async () => {
    renderInBangla(<ConversionBand />);

    expect(await screen.findByText("যেখান থেকে আছেন, সেখান থেকেই শুরু করুন")).toBeInTheDocument();
    expect(screen.getByText("যা লাগবে")).toBeInTheDocument();
    expect(screen.getByText("পূর্ণ নাম")).toBeInTheDocument();
  });

  it("renders bengali calculator labels and headline", async () => {
    renderInBangla(<SolarCalculatorFunnel />);

    expect(await screen.findByText("৩০ সেকেন্ডে আপনার ছাদের সম্ভাবনা হিসাব করুন।")).toBeInTheDocument();
    expect(screen.getByLabelText("গড় মাসিক বিল")).toBeInTheDocument();
    expect(screen.getAllByText("সেভিংস হিসাব করুন").length).toBeGreaterThan(0);
  });
});
