import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line } from 'recharts';
import { sanitize } from 'app/utils';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { Link, NavLink } from 'react-router-dom';
import styles from './table-styles.scss';

const renderTrendLine = (chartData, titleLink) => {
  const dataValues =
    chartData && chartData.split(',').map(v => ({ value: parseFloat(v) }));
  const chart = (
    <LineChart width={70} height={35} data={dataValues}>
      <Line dot={false} dataKey="value" stroke="#113750" strokeWidth={2} />
    </LineChart>
  );
  return titleLink ? (
    <Link className={styles.trendLink} to={titleLink.url}>
      {chart}
    </Link>
  ) : (
    chart
  );
};

const cellRenderer = ({
  props: { parseHtml, titleLinks, trendLine, emptyValueLabel },
  cell
}) => {
  let { cellData } = cell;
  const { rowIndex, dataKey } = cell;
  cellData = sanitize(cellData);
  // check for TitleLink
  const titleLink =
    titleLinks &&
    titleLinks[rowIndex] &&
    titleLinks[rowIndex].find(t => t.columnName === dataKey);

  // check for Trendline
  if (trendLine && dataKey === trendLine) {
    return renderTrendLine(cellData, titleLink);
  }
  if (titleLink) {
    return titleLink.url === 'self' ? (
      <a target="_blank" href={cellData}>
        {cellData}
      </a>
    ) : (
      <NavLink to={titleLink.url}>{cellData}</NavLink>
    );
  }
  // render Html or finally cellData
  return parseHtml ? (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: cellData }} />
  ) : (
    cellData ||
    (emptyValueLabel ? (
      <div className={styles.emptyValue}>{emptyValueLabel}</div>
    ) : (
      ''
    ))
  );
};

cellRenderer.propTypes = {
  cell: PropTypes.object.isRequired,
  props: PropTypes.shape({
    titleLinks: PropTypes.array, // [ [ {columnName: 'title field name in the table', url:'/destination-url' or 'self'}, ... ] ]
    trendLine: PropTypes.string, // 'field name of the trend line column'
    parseHtml: PropTypes.bool,
    emptyValueLabel: PropTypes.string
  })
};

export default cellRenderer;
