import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
box-sizing:border-box;
padding:0;
margin:0;
list-style:none
}
:root{
--primary-color:#222260;
--primary-color2:'color:rgba(34,34,96,.6)';
--primary-color3:'color:rgba(34,34,96,.4)';
--color-green:#42AD00;
--color-grey:#aaa;
--color-accent:#F56692;
--color-delete:#FF0000;
}
body{

  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
font-size:clamp(1rem,1.5vw,1.2rem);
overflow:hidden;
color:rgba(34,34,96,.6);
}`;
