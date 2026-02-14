import "@testing-library/jest-dom";

// Tell React test utilities that updates wrapped in act(...) are expected.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
// Keep react-test-renderer aligned with the same act environment behavior.
(globalThis as { IS_REACT_NATIVE_TEST_ENVIRONMENT?: boolean }).IS_REACT_NATIVE_TEST_ENVIRONMENT =
  true;
