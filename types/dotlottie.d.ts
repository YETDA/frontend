export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        autoplay?: boolean;
        loop?: boolean;
        speed?: number;
        background?: string;
      };
    }
  }
}
