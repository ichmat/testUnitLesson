import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks';
import { act as actDom } from "react-dom/test-utils";
import ReactDOM from "react-dom";

import useCart from "../../hooks/useCart";
import { render, waitFor, screen } from "@testing-library/react";
import Cart from "../../components/Cart";
import { wait } from "@testing-library/user-event/dist/utils";
import useProduct from "../../hooks/useProduct";
import useHome from "../../hooks/useHome";
import Home from "../../components/Home";

let container: any;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
const server = setupServer(
    rest.get(
        "http://localhost:8000/api/products",
        (req, res, ctx) => {
            return res(
                ctx.json([{
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
                ]))})
    );
    jest.setTimeout(15000);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("test component Home", async () => {
        act(() => {
            ReactDOM.render(<Home setRoute={()=>{}} />, container);
          });
        await waitFor(() => screen.getByText(/Menu/i), {timeout:10000});
        expect(container.getElementsByClassName('product').length).toBe(3);
    });

    test("load product", async () => {
        
        const {result} = renderHook(() => useHome());
        const {loading, loadProducts} = result.current;
        expect(loading).toBe(true);
        await act(async () =>  {
            await loadProducts();
        });
        expect(result.current.products).toStrictEqual([{
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
        }]
    );
    });

    const setRoute = (route:string) => {}
