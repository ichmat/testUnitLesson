import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useCart from "../../hooks/useCart";
import { render, waitFor, screen } from "@testing-library/react";
import Cart from "../../components/Cart";
import { wait } from "@testing-library/user-event/dist/utils";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/cart",
        (req, res, ctx) => {
            return res(
                ctx.json({
                        products: [{
                            id: 3,
                            name: 'Summer Smith',
                            price: '15',
                            quantity: 5,
                            image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
                        },
                        {
                            id: 15,
                            name: 'Alien Rick',
                            price: '20',
                            quantity: 20,
                            image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                        },
                        {
                            id: 15,
                            name: 'Alien Rick',
                            price: '20',
                            quantity: 20,
                            image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                        }
                ]}))}),
    // remove
    );
jest.setTimeout(12000);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

    test("test component Cart", async () => {
        const { container } = render(<Cart setRoute={setRoute} />);
        await waitFor(() => screen.getByText(/Votre pannier/i));
        expect(container.getElementsByClassName('product').length).toBe(3);
    });

    test("load cart", async () => {
        const {result} = renderHook(() => useCart());
        const {loading, loadCart} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await loadCart()
        });
        const {products} = result.current;
    });

    test("detect product in cart", async () => {
        const { container } = render(<Cart setRoute={setRoute} />);
        await waitFor(() => screen.getByText(/Votre pannier/i));
        expect(container.getElementsByClassName("product").length).toBe(3);
        // expect(screen.getByText(/Summer Smith/i)).toBe(true);
        // expect(screen.getByText(/Alien Rick/i)).toBe(true);
    });

    test("delete product in cart", async () => {
        const { container } = render(<Cart setRoute={setRoute} />);
        await waitFor(() => screen.getByText(/Votre pannier/i));
        const buttondelete = container.getElementsByTagName("button")[0];
        buttondelete.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await waitFor(() => screen.getByText(/Produit bien supprimé/i), {timeout:10000});
    });


    const setRoute = () => {}

