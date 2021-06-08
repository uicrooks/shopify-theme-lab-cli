<!-- logo (start) -->
<p align="center">
  <img src=".github/img/logo.svg" width="275px">
</p>
<!-- logo (end) -->

<!-- badges (start) -->
<p align="center">
  <img src="https://img.shields.io/github/package-json/v/uicrooks/shopify-theme-lab-cli?color=%236e78ff">
</p>
<!-- badges (end) -->

<!-- title / description (start) -->
<h2 align="center">Shopify Theme Lab CLI</h2>

Command Line Interface for [Shopify Theme Lab](https://github.com/uicrooks/shopify-theme-lab).
> There is no need to install this package locally, `npx` takes care of everything, simply run the commands in your terminal.
<!-- title / description (end) -->

<!-- system requirements (start) -->
## System requirements

- Node.js >= `12.0.0`
<!-- system requirements (end) -->

<!-- commands (start) -->
## Commands
> For all options you can also use the shorthand version, which is the first letter only, with a single dash in front e.g. For `--password` it's `-p`.

**Create a local development environment:**
```sh
$ npx themelab create <directory-name>
```

**Create a local development environment from a preset:**
> Prints a list of available options in the terminal to select from
```sh
$ npx themelab create <directory-name> --preset
```

**Initialize a remote Shopify theme and create a local config file:**
> Run in the root directory of your Shopify Theme Lab project!
```sh
$ npx themelab shopify:init --password [your-api-password] --store [your-store.myshopify.com] --env [dev or live] --name ['theme name']
```

**Create a local config file (connect to an existing Theme Lab theme on a remote store):**
> Run in the root directory of your Shopify Theme Lab project!
```sh
$ npx themelab shopify:init --password [your-api-password] --store [your-store.myshopify.com] --env [dev or live] --id [theme-id]
```

**Create a local config file for a published/main theme:**
> Run in the root directory of your Shopify Theme Lab project!
```sh
$ npx themelab shopify:init --password [your-api-password] --store [your-store.myshopify.com] --env [dev or live] --main
```

**Display help:**
```sh
$ npx themelab --help
```
<!-- commands (end) -->