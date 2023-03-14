import { createGlobalStyle, sanitize } from '@nobia/zeus-components/lib/styled'

export default createGlobalStyle`
  ${sanitize};

  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
  }

  button {
    background-color: transparent;
    cursor: pointer;
    border: 0;
    font-family: inherit;
  }
  ul {
    padding-left: 0px;
    margin: 0px;
  }

  /* TODO Custom CSS need to be moved to MAGNET theme style*/
  .prod-overview-ipad {
    margin-top: -85px;
  }
  .icon-arrow-ipad svg {
    margin-left: -20px;
  }
  .display-table {display: table-cell}
  .display-none {display: none!important}
  .rm-height {min-height: 0px!important}
  @media screen and (min-width: 1024px ){
  .prod-overview-ipad {
    margin-top: auto;
  }
  }
  .carousel-content {
      display: flex;
      transition: all 250ms linear;
  }
  .carousel-content::-webkit-scrollbar{
      height: 1px;
      width: 1px;
      background: #E1E2E3;
  }
  .carousel-content::-webkit-scrollbar-thumb:horizontal{
      background: #122126;
      border-radius: 3px;
  }
  .carousel-content > * {
      width: 100%;
      flex-shrink: 0;
      flex-grow: 1;
      margin-right: 24px;
  }

  .carousel-content.show-2 > * {
      width: calc(50%/1.21);
  }
@media screen and (max-width: 500px) {

  .carousel-content {
    overflow-x: scroll;
    padding-bottom: 25px;
    transform: none!important;

  }
  .carousel-content.show-2 > * {
      width: calc(63%);
  }
}
  .carousel-content.show-3 > * {
      width: calc(111% / 3.6);
  }

  .carousel-content.show-4 > * {
      width: calc(90% / 4);
  }
/**------------------------------ */

  .info-product > div:first-child  {
    border-bottom: 0px;
    border-top: 1px solid #ECEDED;
  }
  .checkbox-style input:checked + .sc-kHWWYL {
    background-color: #fff!important;
  }
  .checkbox-style input:checked + .sc-kHWWYL svg {
    color: #000!important;
  }
  .checkbox-style {
    margin-bottom: 0px;
  }
  .read-more-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .read-more-inner {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .read-more-inner.read-more {
    -webkit-line-clamp: initial;
  }
  .clear-filters {
    background-color: #fff;
    color: #122126;
    border: 1px solid #122126;
  }
  @media screen and (min-width: 767px) {
  .read-more-inner {
    -webkit-line-clamp: 15;
    height: 100%;
  }
}
`
