export const dFormat = (d: Date) => {
  return d.toLocaleDateString("en-GB") + " " + d.toLocaleTimeString("en-GB");
};
