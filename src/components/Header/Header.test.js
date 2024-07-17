import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe('Header component tests', () => {
    it("render correclty", async () => {
        render(<Header />)
        const ele = await screen.getByText('Customer Portal')
        expect(ele).toBeInTheDocument();
    })
})