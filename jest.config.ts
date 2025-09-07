import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // множество разных настроек
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // настройки для ts-jest
      }
    ]
  },
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts'
  }
};

export default config;
