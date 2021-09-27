
/* Do not change this file, it is generated automatically */
import { getRegexpFromPath } from './utils/get-regexp-from-path';

import NotFoundPage from "./pages/404";
import AboutPage from "./pages/about";
import MainPage from "./pages/index";
import CategoriesCategoryIdPage, { getSSRProps as CategoriesCategoryIdPageGetSSRProps } from "./pages/categories/:categoryId";
import DetailsIdPage, { getSSRProps as DetailsIdPageGetSSRProps } from "./pages/details/:id";


export const PagesGetSSRPropsHandlers = {
	"/categories/:categoryId": CategoriesCategoryIdPageGetSSRProps,
	"/details/:id": DetailsIdPageGetSSRProps,

};

export const PagesComponents = {
	"/404": NotFoundPage,
	"/about": AboutPage,
	"/": MainPage,
	"/categories/:categoryId": CategoriesCategoryIdPage,
	"/details/:id": DetailsIdPage,

};
export type PagePaths = keyof typeof PagesComponents;

export const RoutesRegexp: [RegExp, PagePaths][] = Object.keys(
  PagesComponents
).map((current: PagePaths) => {
  return [getRegexpFromPath(current), current];
});
