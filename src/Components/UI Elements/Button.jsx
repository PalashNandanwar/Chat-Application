/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";

export function ButtonDefault({ text }) {
    return <Button variant="gradient" className=" px-[1rem] py-[0.4rem] text-lg rounded-lg">{text}</Button>;
}