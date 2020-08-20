import { } from 'styled-components';
import { CSSProp, CSSObject } from 'styled-components';

// needed so typescript recognizes css prop
// see: https://github.com/styled-components/styled-components/issues/2528
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}