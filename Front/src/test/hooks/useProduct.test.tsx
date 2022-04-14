import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useCart from "../../hooks/useCart";
import { render, waitFor, screen } from "@testing-library/react";
import Cart from "../../components/Cart";
import { wait } from "@testing-library/user-event/dist/utils";
import useProduct from "../../hooks/useProduct";
import Product from "../../components/Product";

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
                rest.post(
                    "http://localhost:8000/api/cart/3",
                    (req, res, ctx) => {
                        try{
                            const { quantity } :any = req.body;
                            return res( ctx.json({}));
                        }catch{
                            return res( ctx.status(405));
                        }
                        }),
    );
    jest.setTimeout(15000);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("test component Product", async () => {
    const product = {
        id: 3,
        name: 'Summer Smith',
        price: '15',
        quantity: 5,
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
    };

    const { container } = render(<Product setRoute={setRoute} data={product} />);
    await waitFor(() => screen.getByText(/Figurine de/i), {timeout:10000});
    expect(container.getElementsByClassName('productName')[0].textContent).toStrictEqual("Figurine de Summer Smith");
});

test("add product", async () => {
    const product = {
        id: 3,
        name: 'Summer Smith',
        price: '15',
        quantity: 5,
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
    };
    const {result} = renderHook(() => useProduct(product));
    const {loading, message, setQuantity} = result.current;
    expect(loading).toEqual(false);
    expect(message).toBeNull();
    act(() => {
        setQuantity(3);
    });
    const {quantity, addProduct} = result.current;
    expect(quantity).toEqual(3);
    await act(async () => {
        await addProduct();
    });
    expect(result.current.message).toEqual("Enregistré dans le panier");
});

const setRoute = (route:string) => {}