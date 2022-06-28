import { generateAccessor, generateLockedAccessor } from "../src";

const en = {
  section1: {
    a: {
      value: "1a",
      b: {
        value: "1b",
        c: {
          value: "1c",
          d: {
            value: "1d",
          },
        },
      },
    },
  },
  section2: {
    a: {
      value: "2a",
      b: {
        value: "2b",
        c: {
          value: "2c",
          d: {
            value: "2d",
          },
        },
      },
    },
  },
  placeholder: {
    a: {
      value: "{0}s passed.",
      b: {
        value: "{0}s {1}s passed.",
        c: {
          value: "{0}s {1}s {2}s passed.",
          d: {
            value: "{0}s {1}s {2}s {3}s passed.",
          },
        },
      },
    },
  },
};

describe("accessor", () => {
  // beforeEach(() => {
  //   return;
  // });

  test("generate accessor normally", () => {
    expect(generateAccessor({ en }, en)).not.toBe(undefined);
  });

  test("fetch leaf value of key", () => {
    const accessor = generateAccessor({ en }, en);
    expect(accessor("en", "section1.a.b.c.d.value")).toBe("1d");
  });
  test("fetch value of key 1", () => {
    const accessor = generateAccessor({ en }, en);
    expect(accessor("en", "section1.a.b.c.value")).toBe("1c");
  });
  test("fetch value of key 2", () => {
    const accessor = generateAccessor({ en }, en);
    expect(accessor("en", "section1.a.value")).toBe("1a");
  });
  test("fetch value of key 3", () => {
    const accessor = generateAccessor({ en }, en);
    expect(accessor("en", "section1.a.b.value")).toBe("1b");
  });
});

describe("accessorLocked", () => {
  beforeEach(() => {
    //accessor = generateAccessor({ en, ja: en }, en);
  });

  test("generate accessorLocked normally", () => {
    const accessor = generateAccessor({ en, ja: en }, en);
    expect(generateLockedAccessor("en", accessor)).not.toBe(undefined);
  });

  test("fetch leaf value of key", () => {
    const accessor = generateAccessor({ en, ja: en }, en);
    const i18n = generateLockedAccessor("en", accessor);
    expect(i18n("section1.a.b.c.d.value")).toBe("1d");
  });
  test("fetch value of key 1", () => {
    const accessor = generateAccessor({ en, ja: en }, en);
    const i18n = generateLockedAccessor("en", accessor);
    expect(i18n("section1.a.b.c.value")).toBe("1c");
  });
  test("fetch value of key 2", () => {
    const accessor = generateAccessor({ en, ja: en }, en);
    const i18n = generateLockedAccessor("ja", accessor);
    expect(i18n("section1.a.value")).toBe("1a");
  });
  test("fetch value of key 3", () => {
    const accessor = generateAccessor({ en, ja: en }, en);
    const i18n = generateLockedAccessor("ja", accessor);
    expect(i18n("section1.a.b.value")).toBe("1b");
  });
});

describe("placeholder", () => {
  test("", () => {
    const accessor = generateAccessor({ en, ja: en }, en);
    const i18n = generateLockedAccessor("ja", accessor);
    expect(i18n("placeholder.a.b.c.d.value", { variables: [100, 101, 102, 103] })).toBe("100s 101s 102s 103s passed.");
  });
  test("", () => {
    const accessor = generateAccessor({ en }, en);
    expect(accessor("en", "placeholder.a.value")).toBe("[N/A]s passed.");
  });
  test("", () => {
    const accessor = generateAccessor({ en }, en);
    expect(accessor("en", "placeholder.a.value", { variables: [1000] })).toBe("1000s passed.");
  });
});
