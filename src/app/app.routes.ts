import { Type } from '@angular/core';
import { Routes } from '@angular/router';

interface ExampleDefinition {
  segment: string;
  title: string;
  loadComponent: () => Promise<Type<unknown>>;
  data?: Record<string, unknown>;
  isCodeOnly?: boolean;
}

export interface ExampleSection {
  title: string;
  basePath: string;
  examples: ExampleDefinition[];
}

export const exampleSections: ExampleSection[] = [
  {
    title: 'Signals',
    basePath: 'signals',
    examples: [
      {
        segment: 'counter-signal',
        title: 'Counter signal',
        loadComponent: () =>
          import('../examples/signals/01-counter-signal.component').then(
            (m) => m.CounterSignalExampleComponent,
          ),
      },
      {
        segment: 'computed-total',
        title: 'Computed total',
        loadComponent: () =>
          import('../examples/signals/02-computed-total.component').then(
            (m) => m.ComputedTotalExampleComponent,
          ),
      },
      {
        segment: 'effect-logger',
        title: 'Effect logger',
        loadComponent: () =>
          import('../examples/signals/03-effect-logger.component').then(
            (m) => m.EffectLoggerExampleComponent,
          ),
      },
      {
        segment: 'http-to-signal',
        title: 'HTTP to signal',
        loadComponent: () =>
          import('../examples/signals/04-http-to-signal.component').then(
            (m) => m.HttpToSignalExampleComponent,
          ),
      },
      {
        segment: 'signal-store',
        title: 'Signal store service',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/signals/05-signal-store.service.ts',
          title: 'Signal store service',
          description:
            'This example exposes a signal-powered store implemented as an injectable service. Review the source to learn how the store composes computed values.',
        },
      },
      {
        segment: 'input-signal',
        title: 'Input signal',
        loadComponent: () =>
          import('../examples/signals/06-input-signal.component').then(
            (m) => m.InputSignalExampleComponent,
          ),
      },
    ],
  },
  {
    title: 'Auth',
    basePath: 'auth',
    examples: [
      {
        segment: 'sign-in-form',
        title: 'Sign in form',
        loadComponent: () =>
          import('../examples/auth/01-sign-in-form.component').then(
            (m) => m.AuthSignInExampleComponent,
          ),
      },
      {
        segment: 'sign-up-form',
        title: 'Sign up form',
        loadComponent: () =>
          import('../examples/auth/02-sign-up-form.component').then(
            (m) => m.AuthSignUpExampleComponent,
          ),
      },
    ],
  },
  {
    title: 'Forms',
    basePath: 'forms',
    examples: [
      {
        segment: 'basic-reactive-form',
        title: 'Basic reactive form',
        loadComponent: () =>
          import('../examples/forms/01-basic-reactive-form.component').then(
            (m) => m.BasicReactiveFormExampleComponent,
          ),
      },
      {
        segment: 'form-array-dynamic',
        title: 'Dynamic form array',
        loadComponent: () =>
          import('../examples/forms/02-form-array-dynamic.component').then(
            (m) => m.FormArrayDynamicExampleComponent,
          ),
      },
      {
        segment: 'cross-field-validation',
        title: 'Cross-field validation',
        loadComponent: () =>
          import('../examples/forms/03-cross-field-validation.component').then(
            (m) => m.CrossFieldValidationExampleComponent,
          ),
      },
      {
        segment: 'custom-toggle-control',
        title: 'Custom toggle control',
        loadComponent: () =>
          import('../examples/forms/04-custom-toggle-control.component').then(
            (m) => m.CustomToggleControlComponent,
          ),
      },
      {
        segment: 'template-driven-form',
        title: 'Template-driven form',
        loadComponent: () =>
          import('../examples/forms/05-template-driven-form.component').then(
            (m) => m.TemplateDrivenFormExampleComponent,
          ),
      },
      {
        segment: 'async-validator',
        title: 'Async validator',
        loadComponent: () =>
          import('../examples/forms/06-async-validator.component').then(
            (m) => m.AsyncValidatorExampleComponent,
          ),
      },
      {
        segment: 'stepper-wizard',
        title: 'Stepper wizard',
        loadComponent: () =>
          import('../examples/forms/07-stepper-wizard.component').then(
            (m) => m.StepperWizardExampleComponent,
          ),
      },
    ],
  },
  {
    title: 'HTTP client',
    basePath: 'http-client',
    examples: [
      {
        segment: 'basic-get-service',
        title: 'Basic GET service',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/http-client/01-basic-get.service.ts',
          title: 'Basic GET service',
          description:
            'Demonstrates a minimal HttpClient GET call returning a typed observable of posts.',
        },
      },
      {
        segment: 'create-resource-service',
        title: 'Create resource service',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/http-client/02-create-resource.service.ts',
          title: 'Create resource service',
          description: 'Shows how to send a POST request that creates a resource using HttpClient.',
        },
      },
      {
        segment: 'auth-interceptor',
        title: 'Auth token interceptor',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/http-client/03-auth-interceptor.ts',
          title: 'Auth token interceptor',
          description: 'An interceptor function that attaches a bearer token to outgoing requests.',
        },
      },
      {
        segment: 'query-params-service',
        title: 'Query params service',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/http-client/04-query-params.service.ts',
          title: 'Query params service',
          description: 'Illustrates composing HttpParams to send strongly typed query parameters.',
        },
      },
      {
        segment: 'http-context-token',
        title: 'HTTP context token',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/http-client/05-http-context-token.ts',
          title: 'HTTP context token',
          description: 'Uses HttpContextToken to flow metadata like retry counts through requests.',
        },
      },
      {
        segment: 'error-handling-service',
        title: 'Error handling service',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/http-client/06-error-handling.service.ts',
          title: 'Error handling service',
          description: 'Wraps HttpClient calls with catchError to centralize error logging and messaging.',
        },
      },
      {
        segment: 'progress-events-service',
        title: 'Progress events service',
        isCodeOnly: true,
        loadComponent: () =>
          import('./code-only-example.component').then(
            (m) => m.CodeOnlyExampleComponent,
          ),
        data: {
          file: 'src/examples/http-client/07-progress-events.service.ts',
          title: 'Progress events service',
          description: 'Streams download progress updates by observing HttpClient events.',
        },
      },
    ],
  },
];

const exampleSectionRoutes: Routes = exampleSections.map((section) => ({
  path: section.basePath,
  children: section.examples.map((example) => ({
    path: example.segment,
    title: `${section.title}: ${example.title}`,
    loadComponent: example.loadComponent,
    data: example.data,
  })),
}));

const defaultExample = exampleSections[0]?.examples[0];
const defaultPath = defaultExample
  ? `${exampleSections[0].basePath}/${defaultExample.segment}`
  : '';

export const routes: Routes = [
  {
    path: '',
    redirectTo: defaultPath ? `examples/${defaultPath}` : 'examples',
    pathMatch: 'full',
  },
  {
    path: 'examples',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: defaultPath,
      },
      ...exampleSectionRoutes,
    ],
  },
  {
    path: '**',
    redirectTo: 'examples',
  },
];
