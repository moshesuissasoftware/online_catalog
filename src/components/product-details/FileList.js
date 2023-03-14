import React from 'react'
import PropTypes from 'prop-types'
import styled, { theme, rem } from '@nobia/zeus-components/lib/styled'
import { em } from '@nobia/zeus-components/lib/helpers/polished'
import { Icon } from '@nobia/zeus-components/lib/icons'
import { Link } from '@nobia/zeus-components/lib/text'

const ListTitle = styled.h3`
  margin-top: ${rem(10)};
  margin-bottom: ${rem(10)};
  font-size: ${rem(12)};
  text-transform: uppercase;
  color: ${theme('colors.primary')};
  letter-spacing: ${em(1.1, 12)};
`

const Files = styled.dl`
  margin-bottom: ${rem(30)};
`

const File = styled.li`
  padding: 0;
  list-style-type: none;
`

const FileLink = styled(Link)`
  display: block;
  padding: ${rem(5)} 0;
  line-height: 2.14;
  text-decoration: none;
  border-bottom: 1px solid ${theme('colors.border')};

  &:hover {
    border-color: currentColor;
  }
`

const FileLinkIcon = styled(Icon).attrs({ width: 16, height: 16, type: 'pdf' })`
  > svg {
    margin-top: 0;
    vertical-align: text-top;
  }
`

const FileList = ({ title, files }) => (
  <>
    {title && <ListTitle>{title}</ListTitle>}
    <Files>
      {files
        .filter(({ url }) => url)
        .map((file, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <File key={i.toString()}>
            <FileLink href={file.url} noopener noreferrer target="_blank">
              <FileLinkIcon>{file.title}</FileLinkIcon>
            </FileLink>
          </File>
        ))}
    </Files>
  </>
)

FileList.propTypes = {
  title: PropTypes.node,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      url: PropTypes.string,
    })
  ).isRequired,
}

FileList.defaultProps = {
  title: undefined,
}

export default FileList
