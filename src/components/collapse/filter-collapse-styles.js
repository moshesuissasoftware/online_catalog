import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'

const CollapseContainer = styled.div`
  padding: 0;
  border-top: 1px solid ${theme('collapse.border.color')};
  ${props => props.theme.media.max.sm`
  border-top: none;
  border-bottom: 1px solid ${theme('collapse.border.color')};
`}
`
const CollapseButton = styled.button`
  display: block;
  width: 100%;
  padding-left: 0;
`
const StyledTitle = styled.span`
  float: left;
  font-family: ${theme('categoryCard.fontFamily')};
  padding: 15px 0;
  font-weight: 500;
  font-size: ${rem(16)};
  ${props => props.theme.media.max.sm`
  padding: 16px 0;
`}
  @media (min-width: 700px) and (max-width: 840px) {
    font-size: 14px;
  }
`
const StyledIcons = styled.span`
  font-weight: 100;
  color: #192228;
  padding-top: 3px;
  font-size: ${rem(20)};
  margin-top: ${rem(10)};
  float: right;
  ${props => props.theme.media.max.sm`
  padding-top: 4px;
`}
`
const CollapsedContent = styled.div`
  > dl {
    margin-top: 0;
    > div {
      padding: ${rem(16)};
    }
  }
  dt {
    font-weight: 500;
    padding-left: 0;
  }
  dd {
    font-weight: 300;
  }
  ${props => props.theme.media.max.sm`
  dd {
  max-width: 160px;
  text-align: right;
  }
`}
`

export {
  CollapseButton,
  CollapseContainer,
  CollapsedContent,
  StyledIcons,
  StyledTitle,
}
