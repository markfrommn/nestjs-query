const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-plugin-prettier");
const _import = require("eslint-plugin-import");
const jest = require("eslint-plugin-jest");
const tsdoc = require("eslint-plugin-tsdoc");

const {
    fixupPluginRules,
    fixupConfigRules,
} = require("@eslint/compat");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        sourceType: "module",

        parserOptions: {
            project: ["./packages/*/tsconfig.json", "./examples/tsconfig.json"],
            tsconfigRootDir: __dirname,
        },
    },

    plugins: {
        import: fixupPluginRules(_import),
        tsdoc,
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
    )),

    rules: {
        "max-classes-per-file": ["error", 5],
        "import/prefer-default-export": "off",
        "import/no-default-export": "error",
        "import/no-cycle": "off",
        "class-methods-use-this": "off",
        "@typescript-eslint/no-useless-constructor": "off",

        "@typescript-eslint/no-redeclare": ["error", {
            ignoreDeclarationMerge: true,
        }],
    },
}, globalIgnores(["**/dist", "**/node_modules"]), {
    files: ["**/*.spec.ts"],

    rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}]);
