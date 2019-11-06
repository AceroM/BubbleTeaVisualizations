export default {
  style: `
    #layer {
      dot-width: 4;
      dot-fill: ramp([heart_rate_zone],
                (#56C58C, #F0CD53, #3AB5F0, #7E78E2, #F45171),
                (low, recovery, aerobic, anaerobic, vo2max));
    }
  `,

  source: `
    SELECT * FROM acerom.bubble_tea_map
  `,
};
