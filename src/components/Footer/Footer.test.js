import { render, screen } from "@testing-library/react";
import { Footer } from ".";
import { expect } from "@playwright/test";


describe("Footer component tests", () => {
    test("render correctly", async () => {
        render(<Footer />)
        const footerEle = await screen.getByTestId("footer")
        expect(footerEle.textContent).toBe("© rights  belongs to NIT.")
    })
})