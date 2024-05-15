import { render, screen } from "@testing-library/react";
import AddNewCustomer from "./AddNewCustomer";


describe('' , ()=>{
    test('' , ()=>{
        render(<AddNewCustomer/>)

        const inn = screen.getAllByRole('button')
        expect(inn).toBeDefined()
    })
})