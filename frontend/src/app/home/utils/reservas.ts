const menuWidth = 200;

export const selectStyles = {
  control: (css) => ({
    ...css,
    width: menuWidth || "auto",
    opacity: menuWidth ? 1 : 0,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  menu: ({ width, ...css }) => ({
    ...css,
    opacity: menuWidth ? 1 : 0,
    width: menuWidth,
  }),
  // Add padding to account for width of Indicators Container plus padding
  option: (css) => ({ ...css, paddingRight: 36 + 8 }),
};

export const stateOptions = [
  { value: "Pernambuco", label: "Pernambuco" },
  { value: "Bahia", label: "Bahia" },
  { value: "São Paulo", label: "São Paulo" },
];

export const cityOptions = [
  { value: "Ipojuca", label: "Ipojuca" },
  { value: "Porto Seguro", label: "Porto Seguro" },
  { value: "São Paulo", label: "São Paulo" },
];

export const SLIDER_MIN_DISTANCE = 50;