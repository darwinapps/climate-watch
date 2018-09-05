const buckets = [
  ['#0165B5', '#25597C'],
  ['#0165B5', '#8BC5F3', '#25597C'],
  ['#0165B5', '#8BC5F3', '#5081A6', '#25597C'],
  ['#0165B5', '#8BC5F3', '#ACBBBF', '#5081A6', '#25597C'],
  ['#0165B5', '#F6CE8E', '#8BC5F3', '#90B1CB', '#5081A6', '#25597C'],
  ['#0165B5', '#F6CE8E', '#8BC5F3', '#90B1CB', '#7199B8', '#5081A6', '#25597C'],
  [
    '#0165B5',
    '#F6CE8E',
    '#8BC5F3',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ],
  [
    '#0165B5',
    '#F6CE8E',
    '#8BC5F3',
    '#E3D2A0',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ],
  [
    '#0165B5',
    '#F6CE8E',
    '#8BC5F3',
    '#E3D2A0',
    '#C5C5B2',
    '#ACBBBF',
    '#90B1CB',
    '#7199B8',
    '#5081A6',
    '#25597C'
  ]
];

export function getColorByIndex(data, index) {
  const length = Object.keys(data).length;
  if (index === -2) return '#B5C7D2';
  return buckets[length - 2][index - 1] || '#FFFFFF';
}

export function createLegendBuckets(locations, labels, isos) {
  if (Object.keys(locations) === isos) return labels;
  // An index of -2 is applied in the backend to 'No Data Submitted'
  const notSubmitted = Object.keys(labels).find(l => labels[l].index === -2);
  if (notSubmitted) {
    const notApplicableKey = parseInt(notSubmitted, 10) + 1;
    return {
      ...labels,
      [notApplicableKey]: { name: 'Not Applicable', index: 0 }
    };
  }
  return { ...labels, 0: { name: 'Not Applicable', index: 0 } };
}

export default {
  getColorByIndex,
  createLegendBuckets
};
