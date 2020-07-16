import { createGlobalStyle } from "styled-components";

import "font-awesome/css/font-awesome.css";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
}
body, html {
  background: #eee;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
}
th {
  font-weight: 700 !important
},
.MuiTypography-colorPrimary {
  color: #e8ae4d;
}
`;

export default GlobalStyle;