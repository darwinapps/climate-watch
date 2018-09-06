const buckets = [
  ['#0165b5', '#8bc5f3'],
  ['#0165b5', '#8bc5f3', '#b5c7d2'],
  ['#0165b5', '#8bc5f3', '#b5c7d2', '#4d5f6a'],
  ['#7982d8', '#0165b5', '#8bc5f3', '#b5c7d2', '#4d5f6a'],
  ['#7982d8', '#0165b5', '#8bc5f3', '#52b4d7', '#b5c7d2', '#4d5f6a'],
  ['#7982d8', '#0165b5', '#8bc5f3', '#52b4d7', '#b5c7d2', '#81939e', '#4d5f6a'],
  [
    '#7982d8',
    '#0165b5',
    '#8bc5f3',
    '#52b4d7',
    '#b5c7d2',
    '#9badb8',
    '#81939e',
    '#4d5f6a'
  ],
  [
    '#7982d8',
    '#0165b5',
    '#4695d4',
    '#8bc5f3',
    '#52b4d7',
    '#b5c7d2',
    '#9badb8',
    '#81939e',
    '#4d5f6a'
  ],
  [
    '#7982d8',
    '#0165b5',
    '#4695d4',
    '#8bc5f3',
    '#52b4d7',
    '#97c1d3',
    '#b5c7d2',
    '#9badb8',
    '#81939e',
    '#4d5f6a'
  ]
];

export function getColorByIndex(data, index) {
  const length = Object.keys(data).length;
  if (index === -2) return '#dee6ec';
  return buckets[length - 2][index - 1] || '#ffffff';
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
