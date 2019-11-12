export default {
  style: `
    @fill: #bd7cc6;
    @line: #FF7844;

    #layer {
      marker-width: 6;
      marker-allow-overlap: false;
      marker-comp-op: multiply;
      marker-fill-opacity: 1;
      marker-fill: @fill;
      marker-line-color: @line;
      marker-line-width: 1;
      marker-line-opacity: 1;

      marker-width: [rating] * 0.4;
    }
  `,

  source: `
    SELECT * FROM cartodata
  `,
};
