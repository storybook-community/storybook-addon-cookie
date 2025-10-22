import type { ProjectAnnotations, Renderer } from "storybook/internal/types";

import { cookieDecorator } from "./preview/cookieDecorator";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [cookieDecorator],
};

export default preview;
