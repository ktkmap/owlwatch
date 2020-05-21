declare module "react";
declare module "react-dom";

declare namespace JSX
{
    interface IntrinsicElements
    {
        [key:string]:any
    }
}