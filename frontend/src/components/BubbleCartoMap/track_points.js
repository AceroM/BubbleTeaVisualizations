export default {
  style: `
    #layer {
      marker-width: 6;
      marker-fill-opacity: 1;
      marker-allow-overlap: false;
      marker-line-width: 0;
      marker-comp-op: multiply;
      marker-fill: grey;
    }
  `,

  source: `
    SELECT * FROM cartodata
  `,
};
