import { render, fireEvent, waitFor } from "@testing-library/react";
import Navbar from '.';


describe("<NavBar />", () => {
  test("Deve mostrar uma navbar com o texto CRUD Developers", async () => {
    const { getByText } = render(<Navbar/>)
    expect(getByText("CRUD Developers")).toBeInTheDocument();
  });
});