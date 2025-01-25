"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify2 = __toESM(require("fastify"));

// src/controller/indexController.ts
var import_fs = require("fs");
var import_path = require("path");
var { readFile } = import_fs.promises;
async function indexController(fastify2) {
  fastify2.get("/", async function(_request, reply) {
    const indexHtmlPath = (0, import_path.resolve)(__dirname, "../../static/index.html");
    const indexHtmlContent = await readFile(indexHtmlPath);
    reply.header("Content-Type", "text/html; charset=utf-8").send(indexHtmlContent);
  });
}

// src/db/client/client.ts
var edgedb = __toESM(require("edgedb"));
var client = edgedb.createClient();
var client_default = client;

// src/db/schema/edgeql-js/path.ts
var import_reflection10 = require("edgedb/dist/reflection/index");

// src/db/schema/edgeql-js/cardinality.ts
var import_reflection = require("edgedb/dist/reflection/index");
var cardutil;
((cardutil2) => {
  function multiplyCardinalities(c1, c2) {
    if (c1 === import_reflection.Cardinality.Empty) return import_reflection.Cardinality.Empty;
    if (c1 === import_reflection.Cardinality.One) return c2;
    if (c1 === import_reflection.Cardinality.AtMostOne) {
      if (c2 === import_reflection.Cardinality.One) return import_reflection.Cardinality.AtMostOne;
      if (c2 === import_reflection.Cardinality.AtLeastOne) return import_reflection.Cardinality.Many;
      return c2;
    }
    if (c1 === import_reflection.Cardinality.Many) {
      if (c2 === import_reflection.Cardinality.Empty) return import_reflection.Cardinality.Empty;
      return import_reflection.Cardinality.Many;
    }
    if (c1 === import_reflection.Cardinality.AtLeastOne) {
      if (c2 === import_reflection.Cardinality.AtMostOne) return import_reflection.Cardinality.Many;
      if (c2 === import_reflection.Cardinality.One) return import_reflection.Cardinality.AtLeastOne;
      return c2;
    }
    throw new Error(`Invalid Cardinality ${c1}`);
  }
  cardutil2.multiplyCardinalities = multiplyCardinalities;
  function multiplyCardinalitiesVariadic(cards) {
    if (cards.length === 0) throw new Error("Empty tuple not allowed");
    if (cards.length === 1) return cards[0];
    return cards.reduce(
      (product, card) => multiplyCardinalities(product, card),
      import_reflection.Cardinality.One
    );
  }
  cardutil2.multiplyCardinalitiesVariadic = multiplyCardinalitiesVariadic;
  function mergeCardinalities(a, b) {
    if (a === import_reflection.Cardinality.Empty) return b;
    if (b === import_reflection.Cardinality.Empty) return a;
    if (a === import_reflection.Cardinality.AtLeastOne) return import_reflection.Cardinality.AtLeastOne;
    if (b === import_reflection.Cardinality.AtLeastOne) return import_reflection.Cardinality.AtLeastOne;
    if (a === import_reflection.Cardinality.One) return import_reflection.Cardinality.AtLeastOne;
    if (b === import_reflection.Cardinality.One) return import_reflection.Cardinality.AtLeastOne;
    return import_reflection.Cardinality.Many;
  }
  cardutil2.mergeCardinalities = mergeCardinalities;
  function mergeCardinalitiesVariadic(cards) {
    if (cards.length === 0) throw new Error("Empty tuple not allowed");
    if (cards.length === 1) return cards[0];
    const [first, second, ...rest] = cards;
    if (cards.length === 2) return mergeCardinalities(first, second);
    return mergeCardinalitiesVariadic([
      mergeCardinalities(first, second),
      ...rest
    ]);
  }
  cardutil2.mergeCardinalitiesVariadic = mergeCardinalitiesVariadic;
  function orCardinalities(c1, c2) {
    if (c1 === c2 || c1 === import_reflection.Cardinality.Many) return c1;
    if (c1 === import_reflection.Cardinality.AtLeastOne) {
      if (c2 === import_reflection.Cardinality.One) return import_reflection.Cardinality.AtLeastOne;
      return import_reflection.Cardinality.Many;
    }
    if (c1 === import_reflection.Cardinality.AtMostOne) {
      if (c2 === import_reflection.Cardinality.Many || c2 === import_reflection.Cardinality.AtLeastOne) {
        return import_reflection.Cardinality.Many;
      }
      return c1;
    }
    if (c1 === import_reflection.Cardinality.Empty) {
      if (c2 === import_reflection.Cardinality.AtMostOne || c2 === import_reflection.Cardinality.One) {
        return import_reflection.Cardinality.AtMostOne;
      }
      return import_reflection.Cardinality.Many;
    }
    if (c2 === import_reflection.Cardinality.Empty) return import_reflection.Cardinality.AtMostOne;
    return c2;
  }
  cardutil2.orCardinalities = orCardinalities;
  function overrideLowerBound(card, override) {
    if (override === "One") {
      if (card === import_reflection.Cardinality.Many || card === import_reflection.Cardinality.AtLeastOne) {
        return import_reflection.Cardinality.AtLeastOne;
      } else {
        return import_reflection.Cardinality.One;
      }
    } else {
      if (card === import_reflection.Cardinality.Many || card === import_reflection.Cardinality.AtLeastOne) {
        return import_reflection.Cardinality.Many;
      } else if (card === import_reflection.Cardinality.Empty) {
        return import_reflection.Cardinality.Empty;
      } else {
        return import_reflection.Cardinality.AtMostOne;
      }
    }
  }
  cardutil2.overrideLowerBound = overrideLowerBound;
  function overrideUpperBound(card, override) {
    if (override === "One") {
      if (card === import_reflection.Cardinality.One || card === import_reflection.Cardinality.AtLeastOne) {
        return import_reflection.Cardinality.One;
      } else {
        return import_reflection.Cardinality.AtMostOne;
      }
    } else {
      if (card === import_reflection.Cardinality.One || card === import_reflection.Cardinality.AtLeastOne) {
        return import_reflection.Cardinality.AtLeastOne;
      } else {
        return import_reflection.Cardinality.Many;
      }
    }
  }
  cardutil2.overrideUpperBound = overrideUpperBound;
  function coalesceCardinalities(c1, c2) {
    if (c1 === import_reflection.Cardinality.One || c1 === import_reflection.Cardinality.AtLeastOne) return c1;
    if (c2 === import_reflection.Cardinality.One) return overrideLowerBound(c1, "One");
    if (c2 === import_reflection.Cardinality.AtLeastOne) return import_reflection.Cardinality.AtLeastOne;
    return orCardinalities(c1, c2);
  }
  cardutil2.coalesceCardinalities = coalesceCardinalities;
})(cardutil || (cardutil = {}));

// src/db/schema/edgeql-js/castMaps.ts
var edgedb2 = __toESM(require("edgedb"));
function getSharedParentScalar(a, b) {
  a = a.__casttype__ || a;
  b = b.__casttype__ || b;
  if (a.__name__ === "std::number") {
    if (b.__name__ === "std::number") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "sys::VersionStage") {
    if (b.__name__ === "sys::VersionStage") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "sys::TransactionIsolation") {
    if (b.__name__ === "sys::TransactionIsolation") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::uuid") {
    if (b.__name__ === "std::uuid") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::str") {
    if (b.__name__ === "std::str") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::json") {
    if (b.__name__ === "std::json") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::int64") {
    if (b.__name__ === "std::int64") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::int32") {
    if (b.__name__ === "std::int32") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::int16") {
    if (b.__name__ === "std::int16") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::float64") {
    if (b.__name__ === "std::float64") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::float32") {
    if (b.__name__ === "std::float32") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::enc::Base64Alphabet") {
    if (b.__name__ === "std::enc::Base64Alphabet") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::duration") {
    if (b.__name__ === "std::duration") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::decimal") {
    if (b.__name__ === "std::decimal") {
      return b;
    }
    if (b.__name__ === "std::bigint") {
      return a;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::datetime") {
    if (b.__name__ === "std::datetime") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::bytes") {
    if (b.__name__ === "std::bytes") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::bool") {
    if (b.__name__ === "std::bool") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::bigint") {
    if (b.__name__ === "std::decimal") {
      return b;
    }
    if (b.__name__ === "std::bigint") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::JsonEmpty") {
    if (b.__name__ === "std::JsonEmpty") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "std::Endian") {
    if (b.__name__ === "std::Endian") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::Volatility") {
    if (b.__name__ === "schema::Volatility") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::TypeModifier") {
    if (b.__name__ === "schema::TypeModifier") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::TriggerTiming") {
    if (b.__name__ === "schema::TriggerTiming") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::TriggerScope") {
    if (b.__name__ === "schema::TriggerScope") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::TriggerKind") {
    if (b.__name__ === "schema::TriggerKind") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::TargetDeleteAction") {
    if (b.__name__ === "schema::TargetDeleteAction") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::SourceDeleteAction") {
    if (b.__name__ === "schema::SourceDeleteAction") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::RewriteKind") {
    if (b.__name__ === "schema::RewriteKind") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::ParameterKind") {
    if (b.__name__ === "schema::ParameterKind") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::OperatorKind") {
    if (b.__name__ === "schema::OperatorKind") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::MigrationGeneratedBy") {
    if (b.__name__ === "schema::MigrationGeneratedBy") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::Cardinality") {
    if (b.__name__ === "schema::Cardinality") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::AccessPolicyAction") {
    if (b.__name__ === "schema::AccessPolicyAction") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "schema::AccessKind") {
    if (b.__name__ === "schema::AccessKind") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "fts::document") {
    if (b.__name__ === "fts::document") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "fts::Weight") {
    if (b.__name__ === "fts::Weight") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "fts::PGLanguage") {
    if (b.__name__ === "fts::PGLanguage") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "fts::LuceneLanguage") {
    if (b.__name__ === "fts::LuceneLanguage") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "fts::Language") {
    if (b.__name__ === "fts::Language") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "fts::ElasticLanguage") {
    if (b.__name__ === "fts::ElasticLanguage") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cfg::memory") {
    if (b.__name__ === "cfg::memory") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cfg::QueryCacheMode") {
    if (b.__name__ === "cfg::QueryCacheMode") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cfg::ConnectionTransport") {
    if (b.__name__ === "cfg::ConnectionTransport") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cfg::AllowBareDDL") {
    if (b.__name__ === "cfg::AllowBareDDL") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cal::relative_duration") {
    if (b.__name__ === "cal::relative_duration") {
      return b;
    }
    if (b.__name__ === "cal::date_duration") {
      return a;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cal::local_time") {
    if (b.__name__ === "cal::local_time") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cal::local_datetime") {
    if (b.__name__ === "cal::local_datetime") {
      return b;
    }
    if (b.__name__ === "cal::local_date") {
      return a;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cal::local_date") {
    if (b.__name__ === "cal::local_datetime") {
      return b;
    }
    if (b.__name__ === "cal::local_date") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  if (a.__name__ === "cal::date_duration") {
    if (b.__name__ === "cal::relative_duration") {
      return b;
    }
    if (b.__name__ === "cal::date_duration") {
      return b;
    }
    throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
  }
  throw new Error(`Types are not castable: ${a.__name__}, ${b.__name__}`);
}
var implicitCastMap = /* @__PURE__ */ new Map([
  ["cal::date_duration", /* @__PURE__ */ new Set(["cal::relative_duration"])],
  ["cal::local_date", /* @__PURE__ */ new Set(["cal::local_datetime"])],
  ["std::bigint", /* @__PURE__ */ new Set(["std::decimal"])]
]);
function isImplicitlyCastableTo(from, to) {
  const _a = implicitCastMap.get(from), _b = _a != null ? _a.has(to) : null;
  return _b != null ? _b : false;
}
function literalToTypeSet(type) {
  if (type && type.__element__) {
    return type;
  }
  if (typeof type === "number") {
    return $getType("00000000-0000-0000-0000-0000000001ff")(type);
  }
  if (typeof type === "string") {
    return $getType("00000000-0000-0000-0000-000000000101")(type);
  }
  if (typeof type === "boolean") {
    return $getType("00000000-0000-0000-0000-000000000109")(type);
  }
  if (typeof type === "bigint") {
    return $getType("00000000-0000-0000-0000-000000000110")(type);
  }
  if (type instanceof Uint8Array) {
    return $getType("00000000-0000-0000-0000-000000000102")(type);
  }
  if (type instanceof Date) {
    return $getType("00000000-0000-0000-0000-00000000010a")(type);
  }
  if (type instanceof edgedb2.Duration) {
    return $getType("00000000-0000-0000-0000-00000000010e")(type);
  }
  if (type instanceof edgedb2.LocalDateTime) {
    return $getType("00000000-0000-0000-0000-00000000010b")(type);
  }
  if (type instanceof edgedb2.LocalDate) {
    return $getType("00000000-0000-0000-0000-00000000010c")(type);
  }
  if (type instanceof edgedb2.LocalTime) {
    return $getType("00000000-0000-0000-0000-00000000010d")(type);
  }
  if (type instanceof edgedb2.RelativeDuration) {
    return $getType("00000000-0000-0000-0000-000000000111")(type);
  }
  if (type instanceof edgedb2.DateDuration) {
    return $getType("00000000-0000-0000-0000-000000000112")(type);
  }
  if (type instanceof edgedb2.ConfigMemory) {
    return $getType("00000000-0000-0000-0000-000000000130")(type);
  }
  throw new Error(`Cannot convert literal '${type}' into scalar type`);
}

// src/db/schema/edgeql-js/collections.ts
var import_reflection2 = require("edgedb/dist/reflection/index");
var indexSliceRegx = /^(-?\d+)(?:(:)(-?\d+)?)?|:(-?\d+)$/;
var arrayLikeProxyHandlers = {
  get(target, prop, proxy) {
    const match = typeof prop === "string" ? prop.match(indexSliceRegx) : null;
    if (match) {
      const start = match[1];
      const end = match[3] ?? match[4];
      const isIndex = start && !match[2];
      return $expressionify({
        __kind__: import_reflection2.ExpressionKind.Operator,
        __element__: target.__element__.__kind__ === import_reflection2.TypeKind.array && isIndex ? target.__element__.__element__ : target.__element__,
        __cardinality__: target.__cardinality__,
        __name__: "[]",
        __opkind__: "Infix",
        __args__: [
          proxy,
          isIndex ? literalToTypeSet(Number(start)) : [
            start && literalToTypeSet(Number(start)),
            end && literalToTypeSet(Number(end))
          ]
        ]
      });
    }
    return target[prop];
  }
};
function arrayLikeIndex(index) {
  const indexTypeSet = literalToTypeSet(index);
  return $expressionify({
    __kind__: import_reflection2.ExpressionKind.Operator,
    __element__: this.__element__.__kind__ === import_reflection2.TypeKind.array ? this.__element__.__element__ : this.__element__,
    __cardinality__: cardutil.multiplyCardinalities(
      this.__cardinality__,
      indexTypeSet.__cardinality__
    ),
    __name__: "[]",
    __opkind__: "Infix",
    __args__: [this, indexTypeSet]
  });
}
function arrayLikeSlice(start, end) {
  const startTypeSet = start && literalToTypeSet(start);
  const endTypeSet = end && literalToTypeSet(end);
  return $expressionify({
    __kind__: import_reflection2.ExpressionKind.Operator,
    __element__: this.__element__,
    __cardinality__: cardutil.multiplyCardinalities(
      cardutil.multiplyCardinalities(
        this.__cardinality__,
        startTypeSet?.__cardinality__ ?? import_reflection2.Cardinality.One
      ),
      endTypeSet?.__cardinality__ ?? import_reflection2.Cardinality.One
    ),
    __name__: "[]",
    __opkind__: "Infix",
    __args__: [this, [startTypeSet, endTypeSet]]
  });
}
function $arrayLikeIndexify(_expr) {
  if (_expr.__element__.__kind__ === import_reflection2.TypeKind.array || _expr.__element__.__kind__ === import_reflection2.TypeKind.scalar && (_expr.__element__.__name__ === "std::str" || _expr.__element__.__name__ === "std::bytes")) {
    const expr = new Proxy(_expr, arrayLikeProxyHandlers);
    expr.index = arrayLikeIndex.bind(expr);
    expr.slice = arrayLikeSlice.bind(expr);
    return expr;
  }
  return _expr;
}
function array(arg) {
  if (Array.isArray(arg)) {
    const items = arg.map((a) => literalToTypeSet(a));
    return $expressionify({
      __kind__: import_reflection2.ExpressionKind.Array,
      __cardinality__: cardutil.multiplyCardinalitiesVariadic(
        items.map((item) => item.__cardinality__)
      ),
      __element__: {
        __kind__: import_reflection2.TypeKind.array,
        __name__: `array<${items[0].__element__.__name__}>`,
        __element__: items[0].__element__
      },
      __items__: items
    });
  }
  if (arg.__kind__) {
    return {
      __kind__: import_reflection2.TypeKind.array,
      __name__: `array<${arg.__name__}>`,
      __element__: arg
    };
  }
  throw new Error("Invalid array input.");
}
var tupleProxyHandlers = {
  get(target, prop, proxy) {
    const type = target.__element__;
    const items = type.__kind__ === import_reflection2.TypeKind.tuple ? type.__items__ : type.__kind__ === import_reflection2.TypeKind.namedtuple ? type.__shape__ : null;
    return items && Object.prototype.hasOwnProperty.call(items, prop) ? tuplePath(proxy, items[prop], prop) : target[prop];
  }
};
function $tuplePathify(expr) {
  if (expr.__element__.__kind__ !== import_reflection2.TypeKind.tuple && expr.__element__.__kind__ !== import_reflection2.TypeKind.namedtuple) {
    return expr;
  }
  return new Proxy(expr, tupleProxyHandlers);
}
function tuplePath(parent, itemType, index) {
  return $expressionify({
    __kind__: import_reflection2.ExpressionKind.TuplePath,
    __element__: itemType,
    __cardinality__: parent.__cardinality__,
    __parent__: parent,
    __index__: index
  });
}
function makeTupleType(name, items) {
  return {
    __kind__: import_reflection2.TypeKind.tuple,
    __name__: name,
    __items__: items
  };
}
var typeKinds = new Set(Object.values(import_reflection2.TypeKind));
function tuple(input) {
  if (Array.isArray(input)) {
    if (input.every((item) => typeKinds.has(item.__kind__))) {
      const typeItems = input;
      const typeName = `tuple<${typeItems.map((item) => item.__name__).join(", ")}>`;
      return makeTupleType(typeName, typeItems);
    }
    const items = input.map((item) => literalToTypeSet(item));
    const name = `tuple<${items.map((item) => item.__element__.__name__).join(", ")}>`;
    return $expressionify({
      __kind__: import_reflection2.ExpressionKind.Tuple,
      __element__: makeTupleType(
        name,
        items.map((item) => item.__element__)
      ),
      __cardinality__: cardutil.multiplyCardinalitiesVariadic(
        items.map((i) => i.__cardinality__)
      ),
      __items__: items
    });
  } else {
    if (Object.values(input).every((el) => typeKinds.has(el.__kind__))) {
      const typeName = `tuple<${Object.entries(input).map(([key, val]) => `${key}: ${val.__name__}`).join(", ")}>`;
      return {
        __kind__: import_reflection2.TypeKind.namedtuple,
        __name__: typeName,
        __shape__: input
      };
    }
    const exprShape = {};
    const typeShape = {};
    for (const [key, val] of Object.entries(input)) {
      const typeSet = literalToTypeSet(val);
      exprShape[key] = typeSet;
      typeShape[key] = typeSet.__element__;
    }
    const name = `tuple<${Object.entries(exprShape).map(([key, val]) => `${key}: ${val.__element__.__name__}`).join(", ")}>`;
    return $expressionify({
      __kind__: import_reflection2.ExpressionKind.NamedTuple,
      __element__: {
        __kind__: import_reflection2.TypeKind.namedtuple,
        __name__: name,
        __shape__: typeShape
      },
      __cardinality__: cardutil.multiplyCardinalitiesVariadic(
        Object.values(exprShape).map((val) => val.__cardinality__)
      ),
      __shape__: exprShape
    });
  }
}
function $objectTypeToTupleType(...args) {
  const [objExpr, fields] = args;
  const shape = Object.entries(objExpr.__element__.__pointers__).reduce(
    (_shape, [key, val]) => {
      if (fields?.length ? fields.includes(key) : key !== "id" && val.__kind__ === "property" && !val.computed) {
        _shape[key] = val.target;
      }
      return _shape;
    },
    {}
  );
  return tuple(shape);
}

// src/db/schema/edgeql-js/toEdgeQL.ts
var import_edgedb = require("edgedb");
var import_reflection4 = require("edgedb/dist/reflection/index");

// src/db/schema/edgeql-js/typesystem.ts
var import_reflection3 = require("edgedb/dist/reflection/index");
function $toSet(root, card) {
  return {
    __element__: root,
    __cardinality__: card
  };
}
function isScalarType(type) {
  return type.__kind__ === import_reflection3.TypeKind.scalar;
}
function isEnumType(type) {
  return type.__kind__ === import_reflection3.TypeKind.enum;
}
function isObjectType(type) {
  return type.__kind__ === import_reflection3.TypeKind.object;
}
function isTupleType(type) {
  return type.__kind__ === import_reflection3.TypeKind.tuple;
}
function isNamedTupleType(type) {
  return type.__kind__ === import_reflection3.TypeKind.namedtuple;
}
function isArrayType(type) {
  return type.__kind__ === import_reflection3.TypeKind.array;
}

// src/db/schema/edgeql-js/toEdgeQL.ts
var import_reflection5 = require("edgedb/dist/reflection/index");
var toEdgeQLCache = /* @__PURE__ */ new WeakMap();
function $toEdgeQL() {
  if (toEdgeQLCache.has(this)) {
    return toEdgeQLCache.get(this);
  }
  const walkExprCtx = {
    seen: /* @__PURE__ */ new Map(),
    rootScope: null
  };
  walkExprTree(this, null, walkExprCtx);
  const withBlocks = /* @__PURE__ */ new Map();
  const withVars = /* @__PURE__ */ new Map();
  const seen = new Map(walkExprCtx.seen);
  const linkProps = /* @__PURE__ */ new Map();
  for (const [expr, refData] of seen) {
    seen.delete(expr);
    if (refData.linkProps.length) {
      linkProps.set(
        expr,
        refData.linkProps.map(
          (linkProp) => linkProp.__parent__.linkName.slice(1)
        )
      );
    }
    if (withVars.has(expr)) {
      continue;
    }
    if (!refData.boundScope && (expr.__kind__ === import_reflection4.ExpressionKind.PathLeaf || expr.__kind__ === import_reflection4.ExpressionKind.PathNode || expr.__kind__ === import_reflection4.ExpressionKind.TypeIntersection)) {
      continue;
    }
    if (expr.__kind__ === import_reflection4.ExpressionKind.ForVar || expr.__kind__ === import_reflection4.ExpressionKind.Param) {
      continue;
    }
    if ((expr.__kind__ === import_reflection4.ExpressionKind.Select || expr.__kind__ === import_reflection4.ExpressionKind.Update || expr.__kind__ === import_reflection4.ExpressionKind.Group) && expr.__scope__ && // with var not previously registered
    !withVars.has(expr.__scope__)) {
      const withBlock = expr;
      const scopeVar = expr.__scope__;
      const scopeVarName = `__scope_${withVars.size}_${scopeVar.__element__.__name__.replace(/[^A-Za-z]/g, "")}`;
      withVars.set(scopeVar, {
        name: scopeVarName,
        scope: withBlock,
        childExprs: /* @__PURE__ */ new Set(),
        scopedExpr: expr.__element__.__kind__ === import_reflection4.TypeKind.object ? expr.__expr__ : void 0
      });
    }
    if (refData.refCount > 1 || refData.boundScope || refData.aliases.length > 0) {
      let withBlock = refData.boundScope;
      const parentScopes = [...refData.parentScopes];
      if (!withBlock) {
        if (parentScopes.some(
          (parentScope) => parentScope && seen.has(parentScope)
        )) {
          seen.set(expr, refData);
          continue;
        }
        if (parentScopes.some((scope) => scope == null)) {
          throw new Error(
            `Cannot extract repeated expression into 'WITH' block, expression used outside of 'WITH'able expression`
          );
        }
        const [firstParentScopeChain, ...parentScopeChains] = parentScopes.map(
          (scope) => {
            const scopes = [scope];
            const pendingScopes = [scope];
            while (pendingScopes.length) {
              const currentScope = pendingScopes.shift();
              pendingScopes.push(
                ...[...walkExprCtx.seen.get(currentScope).parentScopes].filter(
                  (s) => s !== null
                )
              );
              if (!scopes.includes(currentScope)) {
                scopes.push(currentScope);
              }
            }
            return scopes;
          }
        );
        const commonParentScope = firstParentScopeChain ? firstParentScopeChain.find(
          (scope) => (
            // find the first parent scope in the chain that is shared by
            // the other parent scope chains
            parentScopeChains.every(
              (otherScope) => otherScope.includes(scope)
            )
          )
        ) : null;
        withBlock = commonParentScope ?? walkExprCtx.rootScope;
      }
      if (!withBlock) {
        throw new Error(
          `Cannot extract repeated expression into 'WITH' block, expression does not appear within common 'WITH'able expression`
        );
      }
      if (!withBlocks.has(withBlock)) {
        withBlocks.set(withBlock, /* @__PURE__ */ new Set());
      }
      const validScopes = /* @__PURE__ */ new Set([
        withBlock,
        ...walkExprCtx.seen.get(withBlock).childExprs
      ]);
      for (const scope of [
        ...refData.parentScopes,
        ...import_reflection4.util.flatMap(refData.aliases, (alias2) => [
          ...walkExprCtx.seen.get(alias2).parentScopes
        ])
      ]) {
        if (scope === null || !validScopes.has(scope)) {
          throw new Error(
            refData.boundScope ? `Expr or its aliases used outside of declared 'WITH' block scope` : `Cannot extract repeated or aliased expression into 'WITH' block, expression or its aliases appear outside root scope`
          );
        }
      }
      for (const withVar of [expr, ...refData.aliases]) {
        const withVarBoundScope = walkExprCtx.seen.get(withVar).boundScope;
        if (withVarBoundScope && withVarBoundScope !== refData.boundScope) {
          continue;
        }
        const withVarName = `__withVar_${withVars.size}`;
        withBlocks.get(withBlock).add(withVar);
        withVars.set(withVar, {
          name: withVarName,
          scope: withBlock,
          childExprs: new Set(walkExprCtx.seen.get(withVar).childExprs)
        });
      }
    }
  }
  let edgeQL = renderEdgeQL(this, {
    withBlocks,
    withVars,
    forVars: /* @__PURE__ */ new Map(),
    linkProps
  });
  if (edgeQL.startsWith("(") && edgeQL.endsWith(")") && !(this.__kind__ === import_reflection4.ExpressionKind.Tuple || this.__kind__ === import_reflection4.ExpressionKind.NamedTuple || this.__kind__ === import_reflection4.ExpressionKind.Literal)) {
    edgeQL = edgeQL.slice(1, -1);
  }
  toEdgeQLCache.set(this, edgeQL);
  return edgeQL;
}
function walkExprTree(_expr, parentScope, ctx) {
  if (!_expr.__kind__) {
    throw new Error(
      `Expected a valid querybuilder expression, instead received ${typeof _expr}${typeof _expr !== "undefined" ? `: '${_expr}'` : ""}.` + getErrorHint(_expr)
    );
  }
  const expr = _expr;
  function walkShape(shape) {
    for (let param of Object.values(shape)) {
      if (param.__kind__ === import_reflection4.ExpressionKind.PolyShapeElement) {
        param = param.__shapeElement__;
      }
      if (typeof param === "object") {
        if (param.__kind__) {
          childExprs.push(...walkExprTree(param, expr, ctx));
        } else {
          walkShape(param);
        }
      }
    }
  }
  if (!ctx.rootScope && parentScope) {
    ctx.rootScope = parentScope;
  }
  const seenExpr = ctx.seen.get(expr);
  if (seenExpr) {
    seenExpr.refCount += 1;
    seenExpr.parentScopes.add(parentScope);
    return [expr, ...seenExpr.childExprs];
  }
  const childExprs = [];
  ctx.seen.set(expr, {
    refCount: 1,
    parentScopes: /* @__PURE__ */ new Set([parentScope]),
    childExprs,
    boundScope: null,
    aliases: [],
    linkProps: []
  });
  switch (expr.__kind__) {
    case import_reflection4.ExpressionKind.Alias:
      childExprs.push(...walkExprTree(expr.__expr__, parentScope, ctx));
      ctx.seen.get(expr.__expr__).aliases.push(expr);
      break;
    case import_reflection4.ExpressionKind.With:
      childExprs.push(...walkExprTree(expr.__expr__, parentScope, ctx));
      for (const refExpr of expr.__refs__) {
        walkExprTree(refExpr, expr.__expr__, ctx);
        const seenRef = ctx.seen.get(refExpr);
        if (seenRef.boundScope) {
          throw new Error(`Expression bound to multiple 'WITH' blocks`);
        }
        seenRef.boundScope = expr.__expr__;
      }
      break;
    case import_reflection4.ExpressionKind.Literal:
    case import_reflection4.ExpressionKind.ForVar:
    case import_reflection4.ExpressionKind.Param:
      break;
    case import_reflection4.ExpressionKind.PathLeaf:
    case import_reflection4.ExpressionKind.PathNode:
      if (expr.__parent__) {
        if (expr.__parent__.type.__scopedFrom__) {
          childExprs.push(expr.__parent__.type);
        } else {
          childExprs.push(
            ...walkExprTree(expr.__parent__.type, parentScope, ctx)
          );
        }
        if (
          // is link prop
          expr.__kind__ === import_reflection4.ExpressionKind.PathLeaf && expr.__parent__.linkName.startsWith("@")
        ) {
          const parentScopeVar = parentScope.__scope__;
          if (parentScopeVar === expr.__parent__.type) {
            ctx.seen.get(parentScope)?.linkProps.push(expr);
          }
        }
      }
      break;
    case import_reflection4.ExpressionKind.Cast:
      if (expr.__expr__ === null) break;
      childExprs.push(...walkExprTree(expr.__expr__, parentScope, ctx));
      break;
    case import_reflection4.ExpressionKind.Set:
      for (const subExpr of expr.__exprs__) {
        childExprs.push(...walkExprTree(subExpr, parentScope, ctx));
      }
      break;
    case import_reflection4.ExpressionKind.Array:
      for (const subExpr of expr.__items__) {
        childExprs.push(...walkExprTree(subExpr, parentScope, ctx));
      }
      break;
    case import_reflection4.ExpressionKind.Tuple:
      for (const subExpr of expr.__items__) {
        childExprs.push(...walkExprTree(subExpr, parentScope, ctx));
      }
      break;
    case import_reflection4.ExpressionKind.NamedTuple:
      for (const subExpr of Object.values(expr.__shape__)) {
        childExprs.push(...walkExprTree(subExpr, parentScope, ctx));
      }
      break;
    case import_reflection4.ExpressionKind.TuplePath:
      childExprs.push(...walkExprTree(expr.__parent__, parentScope, ctx));
      break;
    case import_reflection4.ExpressionKind.Select:
    case import_reflection4.ExpressionKind.Update: {
      const modifiers = expr.__modifiers__;
      if (modifiers.filter) {
        childExprs.push(...walkExprTree(modifiers.filter, expr, ctx));
      }
      if (modifiers.order_by) {
        for (const orderExpr of modifiers.order_by) {
          childExprs.push(...walkExprTree(orderExpr.expression, expr, ctx));
        }
      }
      if (modifiers.offset) {
        childExprs.push(...walkExprTree(modifiers.offset, expr, ctx));
      }
      if (modifiers.limit) {
        childExprs.push(...walkExprTree(modifiers.limit, expr, ctx));
      }
      if (expr.__kind__ === import_reflection4.ExpressionKind.Select) {
        if (isObjectType(expr.__element__) && // don't walk shape twice if select expr justs wrap another object
        // type expr with the same shape
        expr.__element__.__shape__ !== expr.__expr__.__element__.__shape__) {
          walkShape(expr.__element__.__shape__ ?? {});
        }
      } else {
        const shape = expr.__shape__ ?? {};
        for (const _element of Object.values(shape)) {
          let element = _element;
          if (!element.__element__) {
            if (element["+="]) element = element["+="];
            else if (element["-="]) element = element["-="];
          }
          childExprs.push(...walkExprTree(element, expr, ctx));
        }
      }
      childExprs.push(...walkExprTree(expr.__expr__, expr, ctx));
      break;
    }
    case import_reflection4.ExpressionKind.Delete: {
      childExprs.push(...walkExprTree(expr.__expr__, parentScope, ctx));
      break;
    }
    case import_reflection4.ExpressionKind.Insert: {
      const shape = expr.__shape__ ?? {};
      for (const element of Object.values(shape)) {
        childExprs.push(...walkExprTree(element, expr, ctx));
      }
      childExprs.push(...walkExprTree(expr.__expr__, expr, ctx));
      break;
    }
    case import_reflection4.ExpressionKind.InsertUnlessConflict: {
      const insertChildExprs = [];
      if (expr.__conflict__.on) {
        insertChildExprs.push(
          ...walkExprTree(
            expr.__conflict__.on,
            expr.__expr__,
            ctx
          )
        );
      }
      if (expr.__conflict__.else) {
        insertChildExprs.push(
          ...walkExprTree(
            expr.__conflict__.else,
            expr.__expr__,
            ctx
          )
        );
      }
      walkExprTree(expr.__expr__, parentScope, ctx);
      ctx.seen.get(expr.__expr__).childExprs.push(...insertChildExprs);
      break;
    }
    case import_reflection4.ExpressionKind.Group: {
      const groupingSet = expr.__modifiers__.by;
      for (const [, groupExpr] of groupingSet.__exprs__) {
        const seen = /* @__PURE__ */ new Set();
        if (!seen.has(expr)) {
          childExprs.push(...walkExprTree(groupExpr, expr, ctx));
          seen.add(expr);
        }
      }
      if (!expr.__element__.__shape__.elements.__element__.__shape__) {
        throw new Error("Missing shape in GROUP statement");
      }
      walkShape(expr.__element__.__shape__.elements.__element__.__shape__);
      childExprs.push(...walkExprTree(expr.__expr__, expr, ctx));
      break;
    }
    case import_reflection4.ExpressionKind.TypeIntersection:
      childExprs.push(...walkExprTree(expr.__expr__, parentScope, ctx));
      break;
    case import_reflection4.ExpressionKind.Operator:
    case import_reflection4.ExpressionKind.Function:
      for (const subExpr of expr.__args__) {
        if (Array.isArray(subExpr)) {
          for (const arg of subExpr) {
            if (arg) childExprs.push(...walkExprTree(arg, parentScope, ctx));
          }
        } else {
          childExprs.push(...walkExprTree(subExpr, parentScope, ctx));
        }
      }
      if (expr.__kind__ === import_reflection4.ExpressionKind.Function) {
        for (const subExpr of Object.values(expr.__namedargs__)) {
          childExprs.push(...walkExprTree(subExpr, parentScope, ctx));
        }
      }
      break;
    case import_reflection4.ExpressionKind.For: {
      childExprs.push(...walkExprTree(expr.__iterSet__, expr, ctx));
      childExprs.push(...walkExprTree(expr.__expr__, expr, ctx));
      break;
    }
    case import_reflection4.ExpressionKind.WithParams: {
      if (parentScope !== null) {
        throw new Error(
          `'withParams' does not support being used as a nested expression`
        );
      }
      childExprs.push(...walkExprTree(expr.__expr__, parentScope, ctx));
      break;
    }
    case import_reflection4.ExpressionKind.Detached: {
      childExprs.push(...walkExprTree(expr.__expr__, parentScope, ctx));
      break;
    }
    case import_reflection4.ExpressionKind.Global:
      break;
    default:
      import_reflection4.util.assertNever(
        expr,
        new Error(`Unrecognized expression kind: "${expr.__kind__}"`)
      );
  }
  return [expr, ...childExprs];
}
function renderEdgeQL(_expr, ctx, renderShape = true, noImplicitDetached = false) {
  if (!_expr.__kind__) {
    throw new Error("Invalid expression.");
  }
  const expr = _expr;
  const withVar = ctx.withVars.get(expr);
  if (withVar && ctx.renderWithVar !== expr) {
    return renderShape && expr.__kind__ === import_reflection4.ExpressionKind.Select && isObjectType(expr.__element__) ? `(${withVar.name} ${shapeToEdgeQL(
      expr.__element__.__shape__ || {},
      ctx,
      null,
      true
      // render shape only
    )})` : withVar.name;
  }
  function renderWithBlockExpr(varExpr, _noImplicitDetached) {
    const withBlockElement = ctx.withVars.get(varExpr);
    let renderedExpr = renderEdgeQL(
      withBlockElement.scopedExpr ?? varExpr,
      {
        ...ctx,
        renderWithVar: varExpr
      },
      !withBlockElement.scopedExpr,
      // render shape if no scopedExpr exists
      _noImplicitDetached
    );
    const renderedExprNoDetached = renderEdgeQL(
      withBlockElement.scopedExpr ?? varExpr,
      {
        ...ctx,
        renderWithVar: varExpr
      },
      !withBlockElement.scopedExpr,
      // render shape if no scopedExpr exists
      true
    );
    if (ctx.linkProps.has(expr)) {
      renderedExpr = `(SELECT ${renderedExpr} {
${ctx.linkProps.get(expr).map(
        (linkPropName) => `  __linkprop_${linkPropName} := ${renderedExprNoDetached}@${linkPropName}`
      ).join(",\n")}
})`;
    }
    return `  ${withBlockElement.name} := ${renderedExpr.includes("\n") ? `(
${indent(
      renderedExpr[0] === "(" && renderedExpr[renderedExpr.length - 1] === ")" ? renderedExpr.slice(1, -1) : renderedExpr,
      4
    )}
  )` : renderedExpr}`;
  }
  const scopeExpr = (expr.__kind__ === import_reflection4.ExpressionKind.Select || expr.__kind__ === import_reflection4.ExpressionKind.Update || expr.__kind__ === import_reflection4.ExpressionKind.Group) && ctx.withVars.has(expr.__scope__) ? expr.__scope__ : void 0;
  const scopeExprVar = [];
  const unscopedWithBlock = [];
  const scopedWithBlock = [];
  if (ctx.withBlocks.has(expr) || scopeExpr) {
    const sortedBlockVars = topoSortWithVars(
      ctx.withBlocks.get(expr) ?? /* @__PURE__ */ new Set(),
      ctx
    );
    if (!scopeExpr) {
      unscopedWithBlock.push(
        ...sortedBlockVars.map((blockVar) => renderWithBlockExpr(blockVar))
      );
    } else {
      const scopeVar = ctx.withVars.get(scopeExpr);
      const scopedVars = sortedBlockVars.filter(
        (blockVarExpr) => ctx.withVars.get(blockVarExpr)?.childExprs.has(scopeExpr)
      );
      unscopedWithBlock.push(
        ...sortedBlockVars.filter((blockVar) => !scopedVars.includes(blockVar)).map((blockVar) => renderWithBlockExpr(blockVar))
      );
      if (!scopedVars.length) {
        scopeExprVar.push(renderWithBlockExpr(scopeExpr, noImplicitDetached));
      } else {
        const scopeName = scopeVar.name;
        scopeVar.name = scopeName + "_expr";
        scopeExprVar.push(renderWithBlockExpr(scopeExpr, noImplicitDetached));
        scopeVar.name = scopeName + "_inner";
        scopeExprVar.push(
          `  ${scopeName} := (FOR ${scopeVar.name} IN {${scopeName + "_expr"}} UNION (
    WITH
${indent(
            scopedVars.map((blockVar) => renderWithBlockExpr(blockVar)).join(",\n"),
            4
          )}
    SELECT ${scopeVar.name} {
${scopedVars.map((blockVar) => {
            const name = ctx.withVars.get(blockVar).name;
            return `      ${name} := ${name}`;
          }).join(",\n")}
    }
  ))`
        );
        scopeVar.name = scopeName;
        for (const blockVarExpr of scopedVars) {
          const blockVar = ctx.withVars.get(blockVarExpr);
          blockVar.name = `${scopeName}.${blockVar.name}`;
        }
      }
    }
  }
  const withBlockElements = [
    ...unscopedWithBlock,
    ...scopeExprVar,
    ...scopedWithBlock
  ];
  const withBlock = withBlockElements.length ? `WITH
${withBlockElements.join(",\n")}
` : "";
  if (expr.__kind__ === import_reflection4.ExpressionKind.With) {
    return renderEdgeQL(expr.__expr__, ctx);
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.WithParams) {
    return `(WITH
${expr.__params__.map((param) => {
      const optional2 = param.__cardinality__ === import_reflection4.Cardinality.AtMostOne ? "OPTIONAL " : "";
      let paramExpr;
      if (param.__isComplex__) {
        let cast2 = param.__element__.__name__;
        cast2 = cast2.includes("std::decimal") ? `<${cast2}><${cast2.replace(/std::decimal/g, "std::str")}>` : `<${cast2}>`;
        paramExpr = `${cast2}to_json(<${optional2}str>$${param.__name__})`;
      } else {
        paramExpr = `<${optional2}${param.__element__.__name__}>$${param.__name__}`;
      }
      return `  __param__${param.__name__} := ${paramExpr}`;
    }).join(",\n")}
SELECT ${renderEdgeQL(expr.__expr__, ctx)})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Alias) {
    const aliasedExprVar = ctx.withVars.get(expr.__expr__);
    if (!aliasedExprVar) {
      throw new Error(
        `Expression referenced by alias does not exist in 'WITH' block`
      );
    }
    return aliasedExprVar.name;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.PathNode || expr.__kind__ === import_reflection4.ExpressionKind.PathLeaf) {
    if (!expr.__parent__) {
      return `${noImplicitDetached ? "" : "DETACHED "}${expr.__element__.__name__}`;
    } else {
      const isScopedLinkProp = expr.__parent__.linkName.startsWith("@") && ctx.withVars.has(expr.__parent__.type);
      const linkName = isScopedLinkProp ? `__linkprop_${expr.__parent__.linkName.slice(1)}` : expr.__parent__.linkName;
      const parent = renderEdgeQL(
        expr.__parent__.type,
        ctx,
        false,
        noImplicitDetached
      );
      return `${parent}${linkName.startsWith("@") ? "" : "."}${q(linkName)}`;
    }
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Literal) {
    return literalToEdgeQL(expr.__element__, expr.__value__);
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Set) {
    const exprs = expr.__exprs__;
    if (exprs.every((ex) => ex.__element__.__kind__ === import_reflection4.TypeKind.object) || exprs.every((ex) => ex.__element__.__kind__ !== import_reflection4.TypeKind.object)) {
      if (exprs.length === 0) return `<${expr.__element__.__name__}>{}`;
      return `{ ${exprs.map((ex) => renderEdgeQL(ex, ctx)).join(", ")} }`;
    } else {
      throw new Error(
        `Invalid arguments to set constructor: ${exprs.map((ex) => ex.__element__.__name__).join(", ")}`
      );
    }
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Array) {
    return `[${expr.__items__.map((item) => renderEdgeQL(item, ctx)).join(", ")}]`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Tuple) {
    return `(
${expr.__items__.map(
      (item) => `  ` + renderEdgeQL(item, ctx, renderShape, noImplicitDetached)
    ).join(",\n")}${expr.__items__.length === 1 ? "," : ""}
)`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.NamedTuple) {
    return `(
${Object.keys(expr.__shape__).map(
      (key) => `  ${key} := ${renderEdgeQL(
        expr.__shape__[key],
        ctx,
        renderShape,
        noImplicitDetached
      )}`
    ).join(",\n")}
)`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.TuplePath) {
    return `${renderEdgeQL(expr.__parent__, ctx)}.${expr.__index__}`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Cast) {
    const typeName = expr.__element__.__name__ === "std::number" ? "std::float64" : expr.__element__.__name__;
    if (expr.__expr__ === null) {
      return `<${typeName}>{}`;
    }
    const rawInnerExpr = renderEdgeQL(expr.__expr__, ctx);
    const isCast = expr.__expr__.__kind__ === import_reflection4.ExpressionKind.Cast && rawInnerExpr[0] === "(";
    const innerExpr = isCast ? rawInnerExpr.slice(1, -1) : rawInnerExpr;
    return `(<${typeName}>${innerExpr})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Select) {
    const lines = [];
    if (isObjectType(expr.__element__)) {
      const selectionTarget = renderEdgeQL(
        expr.__scope__ ?? expr.__expr__,
        ctx,
        false
      );
      lines.push(
        `SELECT${selectionTarget === "DETACHED std::FreeObject" ? "" : ` ${selectionTarget}`}`
      );
      if (expr.__element__.__shape__ !== expr.__expr__.__element__.__shape__) {
        lines.push(
          shapeToEdgeQL(
            expr.__element__.__shape__ || {},
            ctx,
            expr.__element__
          )
        );
      }
    } else {
      const needsScalarVar = (expr.__modifiers__.filter || expr.__modifiers__.order_by || expr.__modifiers__.offset || expr.__modifiers__.limit) && !ctx.withVars.has(expr.__expr__);
      lines.push(
        `SELECT ${needsScalarVar ? "_ := " : ""}${renderEdgeQL(
          expr.__expr__,
          ctx
        )}`
      );
      if (needsScalarVar) {
        ctx = { ...ctx, withVars: new Map(ctx.withVars) };
        ctx.withVars.set(expr.__expr__, {
          name: "_",
          childExprs: /* @__PURE__ */ new Set(),
          scope: expr
        });
      }
    }
    const modifiers = [];
    if (expr.__modifiers__.filter) {
      modifiers.push(`FILTER ${renderEdgeQL(expr.__modifiers__.filter, ctx)}`);
    }
    if (expr.__modifiers__.order_by) {
      modifiers.push(
        ...expr.__modifiers__.order_by.map(
          ({ expression, direction, empty }, i) => {
            return `${i === 0 ? "ORDER BY" : "  THEN"} ${renderEdgeQL(
              expression,
              ctx
            )}${direction ? " " + direction : ""}${empty ? " " + empty : ""}`;
          }
        )
      );
    }
    if (expr.__modifiers__.offset) {
      modifiers.push(
        `OFFSET ${renderEdgeQL(
          expr.__modifiers__.offset,
          ctx
        )}`
      );
    }
    if (expr.__modifiers__.limit) {
      modifiers.push(
        `LIMIT ${renderEdgeQL(
          expr.__modifiers__.limit,
          ctx
        )}`
      );
    }
    return (
      // (expr.__modifiers__.singleton ? `select assert_single((` : ``) +
      "(" + withBlock + lines.join(" ") + (modifiers.length ? "\n" + modifiers.join("\n") : "") + ")"
    );
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Update) {
    return `(${withBlock}UPDATE ${renderEdgeQL(expr.__scope__, ctx, false)}${expr.__modifiers__.filter ? `
FILTER ${renderEdgeQL(expr.__modifiers__.filter, ctx)}
` : " "}SET ${shapeToEdgeQL(expr.__shape__, ctx, null, false, false)})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Delete) {
    return `(${withBlock}DELETE ${renderEdgeQL(
      expr.__expr__,
      ctx,
      void 0,
      noImplicitDetached
    )})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Insert) {
    return `(${withBlock}INSERT ${renderEdgeQL(
      expr.__expr__,
      ctx,
      false,
      true
    )} ${shapeToEdgeQL(expr.__shape__, ctx, null, false, false)})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.InsertUnlessConflict) {
    const $on = expr.__conflict__.on;
    const $else = expr.__conflict__.else;
    const clause = [];
    if (!$on) {
      clause.push("\nUNLESS CONFLICT");
    }
    if ($on) {
      clause.push(
        `
UNLESS CONFLICT ON ${renderEdgeQL($on, ctx, false, true)}`
      );
    }
    if ($else) {
      clause.push(`
ELSE (${renderEdgeQL($else, ctx, true, true)})`);
    }
    return `(${renderEdgeQL(expr.__expr__, ctx, false, true).slice(
      1,
      -1
    )}${clause.join("")})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Group) {
    const groupingSet = expr.__modifiers__.by;
    const elementsShape = expr.__element__.__shape__.elements.__element__.__shape__;
    const selectStatement = [];
    const groupStatement = [];
    const groupTarget = renderEdgeQL(expr.__scope__, ctx, false);
    groupStatement.push(`GROUP ${groupTarget}`);
    const combinedBlock = [
      // ...scopedWithBlock,
      // this is deduplicated in e.group
      ...groupingSet.__exprs__.map(
        ([k, v]) => `  ${k} := ${renderEdgeQL(v, ctx)}`
      )
    ];
    groupStatement.push(`USING
${combinedBlock.join(",\n")}`);
    let by = renderGroupingSet(groupingSet).trim();
    if (by[0] === "(" && by[by.length - 1] === ")") {
      by = by.slice(1, by.length - 1);
    }
    groupStatement.push(`BY ` + by);
    const selectTarget = `${groupTarget}_groups`;
    selectStatement.push(
      `WITH
${[
        ...unscopedWithBlock,
        ...scopeExprVar
        // ...scopedWithBlock,
      ].join(",\n")},
  ${selectTarget} := (
${indent(groupStatement.join("\n"), 4)}
)`
    );
    const scopeVar = ctx.withVars.get(expr.__scope__);
    const elementsShapeQuery = indent(
      shapeToEdgeQL(elementsShape, { ...ctx }, expr.__element__),
      2
    ).trim().split(scopeVar.name + ".").join(`${selectTarget}.elements.`);
    selectStatement.push(`SELECT ${selectTarget} {
  key: {${groupingSet.__exprs__.map((e) => e[0]).join(", ")}},
  grouping,
  elements: ${elementsShapeQuery}
}`);
    return `(${selectStatement.join("\n")})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Function) {
    const args = expr.__args__.map(
      (arg) => `${renderEdgeQL(arg, ctx, false)}`
    );
    for (const [key, arg] of Object.entries(expr.__namedargs__)) {
      args.push(`${q(key)} := ${renderEdgeQL(arg, ctx, false)}`);
    }
    return `${expr.__name__}(${args.join(", ")})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Operator) {
    const operator = expr.__name__;
    const args = expr.__args__;
    switch (expr.__opkind__) {
      case import_reflection4.OperatorKind.Infix:
        if (operator === "[]") {
          let index = "";
          if (Array.isArray(args[1])) {
            const [start, end] = args[1];
            if (start) {
              index += renderEdgeQL(start, ctx);
            }
            index += ":";
            if (end) {
              index += renderEdgeQL(end, ctx);
            }
          } else {
            index = renderEdgeQL(args[1], ctx);
          }
          return `${renderEdgeQL(args[0], ctx)}[${index}]`;
        }
        return `(${renderEdgeQL(args[0], ctx)} ${operator} ${renderEdgeQL(
          args[1],
          ctx
        )})`;
      case import_reflection4.OperatorKind.Postfix:
        return `(${renderEdgeQL(args[0], ctx)} ${operator})`;
      case import_reflection4.OperatorKind.Prefix:
        return `(${operator} ${renderEdgeQL(args[0], ctx)})`;
      case import_reflection4.OperatorKind.Ternary:
        if (operator === "if_else") {
          return `(${renderEdgeQL(args[0], ctx)} IF ${renderEdgeQL(
            args[1],
            ctx
          )} ELSE ${renderEdgeQL(args[2], ctx)})`;
        } else {
          throw new Error(`Unknown operator: ${operator}`);
        }
      default:
        import_reflection4.util.assertNever(
          expr.__opkind__,
          new Error(`Unknown operator kind: ${expr.__opkind__}`)
        );
    }
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.TypeIntersection) {
    return `${renderEdgeQL(expr.__expr__, ctx)}[IS ${expr.__element__.__name__}]`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.For) {
    ctx.forVars.set(expr.__forVar__, `__forVar__${ctx.forVars.size}`);
    return `(${withBlock}FOR ${ctx.forVars.get(
      expr.__forVar__
    )} IN {${renderEdgeQL(expr.__iterSet__, ctx)}}
UNION (
${indent(renderEdgeQL(expr.__expr__, ctx), 2)}
))`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.ForVar) {
    const forVar = ctx.forVars.get(expr);
    if (!forVar) {
      throw new Error(`'FOR' loop variable used outside of 'FOR' loop`);
    }
    return forVar;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Param) {
    return `__param__${expr.__name__}`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Detached) {
    return `(DETACHED ${renderEdgeQL(
      expr.__expr__,
      {
        ...ctx,
        renderWithVar: expr.__expr__
      },
      void 0,
      true
    )})`;
  } else if (expr.__kind__ === import_reflection4.ExpressionKind.Global) {
    return `(GLOBAL ${expr.__name__})`;
  } else {
    import_reflection4.util.assertNever(
      expr,
      new Error(`Unrecognized expression kind: "${expr.__kind__}"`)
    );
  }
}
function isGroupingSet(arg) {
  return arg.__kind__ === "groupingset";
}
function renderGroupingSet(set3) {
  const contents = Object.entries(set3.__elements__).map(([k, v]) => {
    return isGroupingSet(v) ? renderGroupingSet(v) : k;
  }).join(", ");
  if (set3.__settype__ === "tuple") {
    return `(${contents})`;
  } else if (set3.__settype__ === "set") {
    return `{${contents}}`;
  } else if (set3.__settype__ === "cube") {
    return `cube(${contents})`;
  } else if (set3.__settype__ === "rollup") {
    return `rollup(${contents})`;
  } else {
    throw new Error(`Unrecognized set type: "${set3.__settype__}"`);
  }
}
function shapeToEdgeQL(shape, ctx, type = null, keysOnly = false, injectImplicitId = true) {
  const pointers = type?.__pointers__ || null;
  const isFreeObject = type?.__name__ === "std::FreeObject";
  if (shape === null) {
    return ``;
  }
  const lines = [];
  const addLine = (line) => lines.push(`${keysOnly ? "" : "  "}${line}`);
  const seen = /* @__PURE__ */ new Set();
  for (const key in shape) {
    if (!Object.prototype.hasOwnProperty.call(shape, key)) continue;
    if (seen.has(key)) {
      console.warn(`Invalid: duplicate key "${key}"`);
      continue;
    }
    seen.add(key);
    let val = shape[key];
    let operator = ":=";
    let polyType = null;
    if (typeof val === "object" && !val.__element__) {
      if (val["+="]) {
        operator = "+=";
        val = val["+="];
      } else if (val["-="]) {
        operator = "-=";
        val = val["-="];
      }
    }
    if (val.__kind__ === import_reflection4.ExpressionKind.PolyShapeElement) {
      polyType = val.__polyType__;
      val = val.__shapeElement__;
    }
    const polyIntersection = polyType ? `[IS ${polyType.__element__.__name__}].` : "";
    const ptr = pointers?.[key];
    const addCardinalityAnnotations = pointers && (!ptr || isFreeObject);
    const expectedCardinality = addCardinalityAnnotations && Object.prototype.hasOwnProperty.call(val, "__cardinality__") ? val.__cardinality__ === import_reflection4.Cardinality.Many || val.__cardinality__ === import_reflection4.Cardinality.AtLeastOne ? "multi " : "single " : "";
    const wrapAssertExists = ptr?.cardinality === import_reflection4.Cardinality.AtLeastOne;
    if (typeof val === "boolean") {
      if (!pointers?.[key] && key[0] !== "@" && type && type?.__name__ !== "std::FreeObject" && !polyIntersection) {
        throw new Error(`Field "${key}" does not exist in ${type?.__name__}`);
      }
      if (val) {
        addLine(`${polyIntersection}${q(key)}`);
      }
      continue;
    }
    if (typeof val !== "object") {
      throw new Error(`Invalid shape element at "${key}".`);
    }
    const valIsExpression = Object.prototype.hasOwnProperty.call(
      val,
      "__kind__"
    );
    if (!valIsExpression) {
      addLine(
        `${polyIntersection}${q(key, false)}: ${indent(
          shapeToEdgeQL(val, ctx, ptr?.target),
          2
        ).trim()}`
      );
      continue;
    }
    if (keysOnly) {
      addLine(
        q(key, false) + (isObjectType(val.__element__) ? `: ${shapeToEdgeQL(val.__element__.__shape__, ctx, null, true)}` : "")
      );
      continue;
    }
    const renderedExpr = renderEdgeQL(val, ctx);
    addLine(
      `${expectedCardinality}${q(key, false)} ${operator} ${wrapAssertExists ? "assert_exists(" : ""}${renderedExpr.includes("\n") ? `(
${indent(
        renderedExpr[0] === "(" && renderedExpr[renderedExpr.length - 1] === ")" ? renderedExpr.slice(1, -1) : renderedExpr,
        4
      )}
  )` : renderedExpr}${wrapAssertExists ? ")" : ""}`
    );
  }
  if (lines.length === 0 && injectImplicitId) {
    addLine("id");
  }
  return keysOnly ? `{${lines.join(", ")}}` : `{
${lines.join(",\n")}
}`;
}
function topoSortWithVars(vars, ctx) {
  if (!vars.size) {
    return [];
  }
  const sorted = [];
  const unvisited = new Set(vars);
  const visiting = /* @__PURE__ */ new Set();
  for (const withVar of unvisited) {
    visit(withVar);
  }
  function visit(withVar) {
    if (!unvisited.has(withVar)) {
      return;
    }
    if (visiting.has(withVar)) {
      throw new Error(`'WITH' variables contain a cyclic dependency`);
    }
    visiting.add(withVar);
    for (const child of ctx.withVars.get(withVar).childExprs) {
      if (vars.has(child)) {
        visit(child);
      }
    }
    visiting.delete(withVar);
    unvisited.delete(withVar);
    sorted.push(withVar);
  }
  return sorted;
}
var numericalTypes = {
  "std::number": true,
  "std::int16": true,
  "std::int32": true,
  "std::int64": true,
  "std::float32": true,
  "std::float64": true
};
function makeLabel(stringified) {
  const MAX_ITERATIONS = 100;
  const prefix = "jsonliteral";
  let counter = 0;
  let label = `${prefix}`;
  while (stringified.includes(`$${label}$`) && counter < MAX_ITERATIONS) {
    label = `${prefix}${counter}`;
    counter++;
  }
  if (counter >= MAX_ITERATIONS) {
    throw new import_edgedb.InputDataError(
      "Counter reached 100 without finding a unique label."
    );
  }
  return label;
}
function literalToEdgeQL(type, val) {
  const typename = type.__casttype__?.__name__ ?? type.__name__;
  let skipCast = false;
  let stringRep;
  if (typename === "std::json") {
    skipCast = true;
    const stringified = JSON.stringify(val);
    const label = `$${makeLabel(stringified)}$`;
    stringRep = `to_json(${label}${JSON.stringify(val)}${label})`;
  } else if (typeof val === "string") {
    if (numericalTypes[typename]) {
      skipCast = typename === type.__name__;
      stringRep = val;
    } else if (type.__kind__ === import_reflection4.TypeKind.enum) {
      skipCast = true;
      const vals = type.__values__;
      if (vals.includes(val)) {
        skipCast = true;
        if (val.includes(" ")) {
          stringRep = `<${type.__name__}>"${val}"`;
        } else {
          stringRep = `${type.__name__}.${q(val)}`;
        }
      } else {
        throw new Error(
          `Invalid value for type ${type.__name__}: ${JSON.stringify(val)}`
        );
      }
    } else {
      if (typename === "std::str") {
        skipCast = true;
      }
      stringRep = JSON.stringify(val);
    }
  } else if (typeof val === "number") {
    if (numericalTypes[typename]) {
      skipCast = typename === type.__name__;
    } else {
      throw new Error(`Unknown numerical type: ${type.__name__}!`);
    }
    stringRep = `${val.toString()}`;
  } else if (typeof val === "boolean") {
    stringRep = `${val.toString()}`;
    skipCast = true;
  } else if (typeof val === "bigint") {
    stringRep = `${val.toString()}n`;
  } else if (Array.isArray(val)) {
    skipCast = val.length !== 0;
    if (isArrayType(type)) {
      stringRep = `[${val.map((el) => literalToEdgeQL(type.__element__, el)).join(", ")}]`;
    } else if (isTupleType(type)) {
      stringRep = `( ${val.map((el, j) => literalToEdgeQL(type.__items__[j], el)).join(", ")}${type.__items__.length === 1 ? "," : ""} )`;
    } else {
      throw new Error(
        `Invalid value for type ${type.__name__}: ${JSON.stringify(val)}`
      );
    }
  } else if (val instanceof Date) {
    stringRep = `'${val.toISOString()}'`;
  } else if (val instanceof import_edgedb.LocalDate || val instanceof import_edgedb.LocalDateTime || val instanceof import_edgedb.LocalTime || val instanceof import_edgedb.Duration || val instanceof import_edgedb.RelativeDuration || val instanceof import_edgedb.DateDuration) {
    stringRep = `'${val.toString()}'`;
  } else if (val instanceof Uint8Array) {
    stringRep = bufferToStringRep(val);
    skipCast = true;
  } else if (val instanceof Float32Array) {
    stringRep = `[${val.join(",")}]`;
  } else if (val instanceof import_edgedb.Range) {
    const elType = type.__element__;
    const elTypeName = elType.__name__ === "std::number" ? "std::int64" : elType.__name__;
    return `std::range(${val.lower === null ? `<${elTypeName}>{}` : literalToEdgeQL(elType, val.lower)}, ${val.upper === null ? `<${elTypeName}>{}` : literalToEdgeQL(elType, val.upper)}, inc_lower := ${val.incLower}, inc_upper := ${val.incUpper})`;
  } else if (typeof val === "object") {
    if (isNamedTupleType(type)) {
      stringRep = `( ${Object.entries(val).map(
        ([key, value]) => `${key} := ${literalToEdgeQL(type.__shape__[key], value)}`
      )} )`;
      skipCast = true;
    } else {
      throw new Error(
        `Invalid value for type ${type.__name__}: ${JSON.stringify(val)}`
      );
    }
  } else {
    throw new Error(
      `Invalid value for type ${type.__name__}: ${JSON.stringify(val)}`
    );
  }
  if (skipCast) {
    return stringRep;
  }
  return `<${type.__name__}>${stringRep}`;
}
function indent(str2, depth) {
  return str2.split("\n").map((line) => " ".repeat(depth) + line).join("\n");
}
function q(ident, allowBacklinks = true) {
  if (!ident || ident.startsWith("@") || allowBacklinks && (ident.startsWith("<") || ident.includes("::"))) {
    return ident;
  }
  const isAlphaNum = /^([^\W\d]\w*|([1-9]\d*|0))$/.test(ident);
  if (isAlphaNum) {
    const lident = ident.toLowerCase();
    const isReserved = lident !== "__type__" && lident !== "__std__" && import_reflection5.reservedKeywords.has(lident);
    if (!isReserved) {
      return ident;
    }
  }
  return "`" + ident.replace(/`/g, "``") + "`";
}
function bufferToStringRep(buf) {
  let stringRep = "";
  for (const byte of buf) {
    if (byte < 32 || byte > 126) {
      switch (byte) {
        case 8:
          stringRep += "\\b";
          break;
        case 9:
          stringRep += "\\t";
          break;
        case 10:
          stringRep += "\\n";
          break;
        case 12:
          stringRep += "\\f";
          break;
        case 13:
          stringRep += "\\r";
          break;
        default:
          stringRep += `\\x${byte.toString(16).padStart(2, "0")}`;
      }
    } else {
      stringRep += (byte === 39 || byte === 92 ? "\\" : "") + String.fromCharCode(byte);
    }
  }
  return `b'${stringRep}'`;
}
function getErrorHint(expr) {
  let literalConstructor = null;
  switch (typeof expr) {
    case "string":
      literalConstructor = "e.str()";
      break;
    case "number":
      literalConstructor = Number.isInteger(expr) ? "e.int64()" : "e.float64()";
      break;
    case "bigint":
      literalConstructor = "e.bigint()";
      break;
    case "boolean":
      literalConstructor = "e.bool()";
      break;
  }
  switch (true) {
    case expr instanceof Date:
      literalConstructor = "e.datetime()";
      break;
    case expr instanceof import_edgedb.Duration:
      literalConstructor = "e.duration()";
      break;
    case expr instanceof import_edgedb.LocalDate:
      literalConstructor = "e.cal.local_date()";
      break;
    case expr instanceof import_edgedb.LocalDateTime:
      literalConstructor = "e.cal.local_datetime()";
      break;
    case expr instanceof import_edgedb.LocalTime:
      literalConstructor = "e.cal.local_time()";
      break;
    case expr instanceof import_edgedb.RelativeDuration:
      literalConstructor = "e.cal.relative_duration()";
      break;
    case expr instanceof import_edgedb.DateDuration:
      literalConstructor = "e.cal.date_duration()";
      break;
  }
  return literalConstructor ? `
Hint: Maybe you meant to wrap the value in a '${literalConstructor}' expression?` : "";
}

// src/db/schema/edgeql-js/query.ts
var import_reflection9 = require("edgedb/dist/reflection/index");

// src/db/schema/edgeql-js/json.ts
var import_reflection6 = require("edgedb/dist/reflection/index");
var import_buffer = require("edgedb/dist/primitives/buffer");
function jsonStringify(type, val) {
  if (type.__kind__ === import_reflection6.TypeKind.array) {
    if (Array.isArray(val)) {
      return `[${val.map((item) => jsonStringify(type.__element__, item)).join()}]`;
    }
    throw new Error(`Param with array type is not an array`);
  }
  if (type.__kind__ === import_reflection6.TypeKind.tuple) {
    if (!Array.isArray(val)) {
      throw new Error(`Param with tuple type is not an array`);
    }
    if (val.length !== type.__items__.length) {
      throw new Error(
        `Param with tuple type has incorrect number of items. Got ${val.length} expected ${type.__items__.length}`
      );
    }
    return `[${val.map((item, i) => jsonStringify(type.__items__[i], item)).join()}]`;
  }
  if (type.__kind__ === import_reflection6.TypeKind.namedtuple) {
    if (typeof val !== "object") {
      throw new Error(`Param with named tuple type is not an object`);
    }
    if (Object.keys(val).length !== Object.keys(type.__shape__).length) {
      throw new Error(
        `Param with named tuple type has incorrect number of items. Got ${Object.keys(val).length} expected ${Object.keys(type.__shape__).length}`
      );
    }
    return `{${Object.entries(val).map(([key, item]) => {
      if (!type.__shape__[key]) {
        throw new Error(
          `Unexpected key in named tuple param: ${key}, expected keys: ${Object.keys(
            type.__shape__
          ).join()}`
        );
      }
      return `"${key}": ${jsonStringify(type.__shape__[key], item)}`;
    }).join()}}`;
  }
  if (type.__kind__ === import_reflection6.TypeKind.scalar) {
    switch (type.__name__) {
      case "std::bigint":
        return val.toString();
      case "std::json":
        return JSON.stringify(val);
      case "std::bytes":
        return `"${(0, import_buffer.encodeB64)(val)}"`;
      case "cfg::memory":
        return `"${val.toString()}"`;
      default:
        return JSON.stringify(val);
    }
  }
  if (type.__kind__ === import_reflection6.TypeKind.enum) {
    return JSON.stringify(val);
  }
  throw new Error(`Invalid param type: ${type.__kind__}`);
}
function jsonifyComplexParams(expr, _args) {
  if (_args && expr.__kind__ === import_reflection6.ExpressionKind.WithParams) {
    const args = { ..._args };
    for (const param of expr.__params__) {
      if (param.__isComplex__) {
        args[param.__name__] = jsonStringify(
          param.__element__,
          args[param.__name__]
        );
      }
    }
    return args;
  }
  return _args;
}

// src/db/schema/edgeql-js/select.ts
var import_edgedb2 = require("edgedb");
var import_reflection8 = require("edgedb/dist/reflection/index");

// src/db/schema/edgeql-js/hydrate.ts
var import_reflection7 = require("edgedb/dist/reflection/index");
var typeCache = /* @__PURE__ */ new Map();
var _linkProps = Symbol();
function applySpec(spec2, type, shape, seen, literal2) {
  const allPointers = [
    ...type.pointers,
    ...type.backlinks,
    ...type.backlink_stubs
  ];
  for (const ptr of allPointers) {
    if (seen.has(ptr.name)) {
      continue;
    }
    seen.add(ptr.name);
    if (ptr.kind === "link") {
      shape[ptr.name] = {
        __kind__: "link",
        cardinality: ptr.card,
        exclusive: ptr.is_exclusive,
        computed: ptr.is_computed,
        readonly: ptr.is_readonly
      };
      import_reflection7.util.defineGetter(
        shape[ptr.name],
        "target",
        () => makeType(spec2, ptr.target_id, literal2)
      );
      import_reflection7.util.defineGetter(shape[ptr.name], "properties", () => {
        if (!shape[ptr.name][_linkProps]) {
          const linkProperties = shape[ptr.name][_linkProps] = {};
          for (const linkProp of ptr.pointers ?? []) {
            if (linkProp.kind !== "property") {
              return;
            }
            if (linkProp.name === "source" || linkProp.name === "target") {
              return;
            }
            const linkPropObject = {
              __kind__: "property"
            };
            linkPropObject.cardinality = linkProp.card;
            import_reflection7.util.defineGetter(linkPropObject, "target", () => {
              return makeType(spec2, linkProp.target_id, literal2);
            });
            linkProperties[linkProp.name] = linkPropObject;
          }
        }
        return shape[ptr.name][_linkProps];
      });
    } else if (ptr.kind === "property") {
      shape[ptr.name] = {
        __kind__: "property",
        cardinality: ptr.card,
        exclusive: ptr.is_exclusive,
        computed: ptr.is_computed,
        readonly: ptr.is_readonly
      };
      import_reflection7.util.defineGetter(
        shape[ptr.name],
        "target",
        () => makeType(spec2, ptr.target_id, literal2)
      );
    }
  }
}
function makeType(spec2, id, literal2, anytype) {
  const type = spec2.get(id);
  if (type.name === "anytype" || type.name === "std::anypoint") {
    if (anytype) return anytype;
    throw new Error("anytype not provided");
  }
  if (typeCache.has(id)) {
    return typeCache.get(id);
  }
  const obj = {};
  obj.__name__ = type.name;
  if (type.kind === "object") {
    obj.__kind__ = import_reflection7.TypeKind.object;
    const pointers = {};
    const seen = /* @__PURE__ */ new Set();
    applySpec(spec2, type, pointers, seen, literal2);
    const ancestors = [...type.bases];
    for (const anc of ancestors) {
      const ancType = spec2.get(anc.id);
      if (ancType.kind === "object" || ancType.kind === "scalar") {
        ancestors.push(...ancType.bases);
      }
      if (ancType.kind !== "object") {
        throw new Error(`Not an object: ${id}`);
      }
      applySpec(spec2, ancType, pointers, seen, literal2);
    }
    obj.__pointers__ = pointers;
    obj.__shape__ = {};
    typeCache.set(id, obj);
    return obj;
  } else if (type.kind === "scalar") {
    const scalarObj = type.is_abstract ? {} : type.enum_values ? {} : (
      // : type.name === "std::json"
      // ? (((val: any) => {
      //     return literal(scalarObj, JSON.stringify(val));
      //   }) as any)
      (val) => {
        return literal2(scalarObj, val);
      }
    );
    if (type.enum_values) {
      scalarObj.__kind__ = import_reflection7.TypeKind.enum;
      scalarObj.__values__ = type.enum_values;
      for (const val of type.enum_values) {
        Object.defineProperty(scalarObj, val, {
          get() {
            return literal2(scalarObj, val);
          }
        });
      }
    } else {
      scalarObj.__kind__ = import_reflection7.TypeKind.scalar;
    }
    scalarObj.__name__ = type.name;
    if (type.cast_type) {
      scalarObj.__casttype__ = makeType(spec2, type.cast_type, literal2);
    }
    typeCache.set(id, scalarObj);
    return scalarObj;
  } else if (type.kind === "array") {
    obj.__kind__ = import_reflection7.TypeKind.array;
    import_reflection7.util.defineGetter(obj, "__element__", () => {
      return makeType(spec2, type.array_element_id, literal2, anytype);
    });
    import_reflection7.util.defineGetter(obj, "__name__", () => {
      return `array<${obj.__element__.__name__}>`;
    });
    return obj;
  } else if (type.kind === "tuple") {
    if (type.tuple_elements[0].name === "0") {
      obj.__kind__ = import_reflection7.TypeKind.tuple;
      import_reflection7.util.defineGetter(obj, "__items__", () => {
        return type.tuple_elements.map(
          (el) => makeType(spec2, el.target_id, literal2, anytype)
        );
      });
      import_reflection7.util.defineGetter(obj, "__name__", () => {
        return `tuple<${obj.__items__.map((item) => item.__name__).join(", ")}>`;
      });
      return obj;
    } else {
      obj.__kind__ = import_reflection7.TypeKind.namedtuple;
      import_reflection7.util.defineGetter(obj, "__shape__", () => {
        const shape = {};
        for (const el of type.tuple_elements) {
          shape[el.name] = makeType(spec2, el.target_id, literal2, anytype);
        }
        return shape;
      });
      import_reflection7.util.defineGetter(obj, "__name__", () => {
        return `tuple<${Object.entries(obj.__shape__).map(([key, val]) => `${key}: ${val.__name__}`).join(", ")}>`;
      });
      return obj;
    }
  } else if (type.kind === "range") {
    obj.__kind__ = import_reflection7.TypeKind.range;
    import_reflection7.util.defineGetter(obj, "__element__", () => {
      return makeType(spec2, type.range_element_id, literal2, anytype);
    });
    import_reflection7.util.defineGetter(obj, "__name__", () => {
      return `range<${obj.__element__.__name__}>`;
    });
    return obj;
  } else if (type.kind === "multirange") {
    obj.__kind__ = import_reflection7.TypeKind.multirange;
    import_reflection7.util.defineGetter(obj, "__element__", () => {
      return makeType(spec2, type.multirange_element_id, literal2, anytype);
    });
    import_reflection7.util.defineGetter(obj, "__name__", () => {
      return `multirange<${obj.__element__.__name__}>`;
    });
    return obj;
  } else {
    throw new Error(`Invalid type: ${JSON.stringify(type, null, 2)}`);
  }
}
function $mergeObjectTypes(a, b) {
  const obj = {
    __kind__: import_reflection7.TypeKind.object,
    __name__: `${a.__name__} UNION ${b.__name__}`,
    get __pointers__() {
      const merged = {};
      for (const [akey, aitem] of Object.entries(a.__pointers__)) {
        if (!b.__pointers__[akey]) continue;
        const bitem = b.__pointers__[akey];
        if (aitem.cardinality !== bitem.cardinality) continue;
        if (aitem.target.__name__ !== bitem.target.__name__) continue;
        merged[akey] = aitem;
      }
      return merged;
    },
    __shape__: {}
  };
  return obj;
}

// src/db/schema/edgeql-js/reflection.ts
var reflection_exports = {};
__export(reflection_exports, {
  $mergeObjectTypes: () => $mergeObjectTypes,
  $toSet: () => $toSet,
  cardutil: () => cardutil,
  isArrayType: () => isArrayType,
  isEnumType: () => isEnumType,
  isNamedTupleType: () => isNamedTupleType,
  isObjectType: () => isObjectType,
  isScalarType: () => isScalarType,
  isTupleType: () => isTupleType,
  makeType: () => makeType
});
__reExport(reflection_exports, require("edgedb/dist/reflection/index"));

// src/db/schema/edgeql-js/__spec__.ts
var spec = new reflection_exports.StrictMap();
spec.set("00000000-0000-0000-0000-000000000003", { "id": "00000000-0000-0000-0000-000000000003", "name": "anyobject", "is_abstract": false, "kind": "unknown", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000002", { "id": "00000000-0000-0000-0000-000000000002", "name": "anytuple", "is_abstract": false, "kind": "unknown", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000001", { "id": "00000000-0000-0000-0000-000000000001", "name": "anytype", "is_abstract": false, "kind": "unknown", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a6f5468c-c2a6-5852-8f73-57484b1c6831", { "id": "a6f5468c-c2a6-5852-8f73-57484b1c6831", "name": "array<anytype>", "is_abstract": true, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000001", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("fd652c7f-67e3-516f-b508-c8e6f227311e", { "id": "fd652c7f-67e3-516f-b508-c8e6f227311e", "name": "array<cal::date_duration>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000112", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("80d4b62c-e31c-51c6-b994-afaae5b6eff6", { "id": "80d4b62c-e31c-51c6-b994-afaae5b6eff6", "name": "array<cal::local_date>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-00000000010c", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("3a39c464-a115-5b5e-8968-fb30b2c6a7a1", { "id": "3a39c464-a115-5b5e-8968-fb30b2c6a7a1", "name": "array<cal::local_datetime>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-00000000010b", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("d9d5e4a4-d545-5a03-a9da-571d8807619f", { "id": "d9d5e4a4-d545-5a03-a9da-571d8807619f", "name": "array<cal::local_time>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-00000000010d", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2417884d-4995-5a45-8c61-614adab347a7", { "id": "2417884d-4995-5a45-8c61-614adab347a7", "name": "array<cal::relative_duration>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000111", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("3ed001c4-98e8-53a8-b2d1-0cad168d926c", { "id": "3ed001c4-98e8-53a8-b2d1-0cad168d926c", "name": "array<range<std|anypoint>>", "is_abstract": true, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "49748e47-8d91-5269-9a34-2e8ca194e0f2", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("48aa45ef-4d93-5fbd-bfb5-81bf67b49eab", { "id": "48aa45ef-4d93-5fbd-bfb5-81bf67b49eab", "name": "array<std::bytes>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000102", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2b65df4c-4942-59b1-8819-061ca68b2f4e", { "id": "2b65df4c-4942-59b1-8819-061ca68b2f4e", "name": "array<std::float64>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000107", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("574de665-be6f-5562-a55d-448593e7b73d", { "id": "574de665-be6f-5562-a55d-448593e7b73d", "name": "array<std::int16>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000103", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("b441b816-8f3c-5efe-9109-2d6e99b73029", { "id": "b441b816-8f3c-5efe-9109-2d6e99b73029", "name": "array<std::json>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-00000000010f", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("bb221d39-09f1-507e-8851-62075bb61823", { "id": "bb221d39-09f1-507e-8851-62075bb61823", "name": "array<std::str>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000101", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("1378c9c3-b11a-5a95-bdac-066a4143094d", { "id": "1378c9c3-b11a-5a95-bdac-066a4143094d", "name": "array<std::uuid>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "00000000-0000-0000-0000-000000000100", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("212f4161-55eb-569e-945d-ae24bdab437a", { "id": "212f4161-55eb-569e-945d-ae24bdab437a", "name": "array<tuple<name:std|str, expr:std|str>>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "f5e31516-7567-519d-847f-397a0762ce23", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("cc3f58f4-ffd4-5f38-97d9-6b5844e89037", { "id": "cc3f58f4-ffd4-5f38-97d9-6b5844e89037", "name": "array<tuple<name:std|str, expr:tuple<text:std||str, refs:array<std||||uuid>>>>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "27d815f4-6518-598a-a3c5-9364342d6e06", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("db5fcf76-8269-568c-ba2b-b36b0796b880", { "id": "db5fcf76-8269-568c-ba2b-b36b0796b880", "name": "array<tuple<text:std|str, refs:array<std||uuid>>>", "is_abstract": false, "kind": "array", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": "67996f7a-c82f-5b58-bb0a-f29764ee45c2", "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a64cb492-91a2-5ee0-890a-6caeb3e32aa5", { "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", "name": "std::anyscalar", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000112", { "id": "00000000-0000-0000-0000-000000000112", "name": "cal::date_duration", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("581b0325-a044-58d4-aa37-3a85ea671313", { "id": "581b0325-a044-58d4-aa37-3a85ea671313", "name": "std::anypoint", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("c11411fe-17a4-525e-a945-3cb0f04560d2", { "id": "c11411fe-17a4-525e-a945-3cb0f04560d2", "name": "std::anydiscrete", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "581b0325-a044-58d4-aa37-3a85ea671313" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-00000000010c", { "id": "00000000-0000-0000-0000-00000000010c", "name": "cal::local_date", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "c11411fe-17a4-525e-a945-3cb0f04560d2" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("1e91671c-8df3-5a76-b695-ccbbb042699a", { "id": "1e91671c-8df3-5a76-b695-ccbbb042699a", "name": "std::anycontiguous", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "581b0325-a044-58d4-aa37-3a85ea671313" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-00000000010b", { "id": "00000000-0000-0000-0000-00000000010b", "name": "cal::local_datetime", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "1e91671c-8df3-5a76-b695-ccbbb042699a" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-00000000010d", { "id": "00000000-0000-0000-0000-00000000010d", "name": "cal::local_time", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000111", { "id": "00000000-0000-0000-0000-000000000111", "name": "cal::relative_duration", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("0d14e49f-d9f9-51f0-b8f4-c432982cbac2", { "id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "name": "std::BaseObject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "id", "target_id": "00000000-0000-0000-0000-000000000100", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": true, "has_default": true, "pointers": [] }, { "card": "One", "name": "__type__", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": false, "pointers": [] }], "exclusives": [{ "id": { "card": "One", "name": "id", "target_id": "00000000-0000-0000-0000-000000000100", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": true, "has_default": true, "pointers": [] } }], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("d408002f-3891-5b9a-b19c-23589a88998b", { "id": "d408002f-3891-5b9a-b19c-23589a88998b", "name": "cfg::ConfigObject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("8b66e734-a01e-5638-a812-359e0d005a37", { "id": "8b66e734-a01e-5638-a812-359e0d005a37", "name": "cfg::AbstractConfig", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "d408002f-3891-5b9a-b19c-23589a88998b" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "extensions", "target_id": "89fb9b8b-d3b2-5075-9d1a-f5b116a0f188", "kind": "link", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "session_idle_timeout", "target_id": "00000000-0000-0000-0000-00000000010e", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "One", "name": "session_idle_transaction_timeout", "target_id": "00000000-0000-0000-0000-00000000010e", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "One", "name": "query_execution_timeout", "target_id": "00000000-0000-0000-0000-00000000010e", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "listen_port", "target_id": "00000000-0000-0000-0000-000000000104", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "Many", "name": "listen_addresses", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "auth", "target_id": "a2ba7516-d398-5ec2-b25e-221b2f7b9e87", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "allow_dml_in_functions", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "allow_bare_ddl", "target_id": "50264e27-859e-5d2b-a589-ebb3d8ba4d8c", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "apply_access_policies", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "allow_user_specified_id", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "Many", "name": "cors_allow_origins", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "auto_rebuild_query_cache", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "auto_rebuild_query_cache_timeout", "target_id": "00000000-0000-0000-0000-00000000010e", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "query_cache_mode", "target_id": "7cb23cda-17b8-575c-9561-05e2e9351897", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "shared_buffers", "target_id": "00000000-0000-0000-0000-000000000130", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "query_work_mem", "target_id": "00000000-0000-0000-0000-000000000130", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "maintenance_work_mem", "target_id": "00000000-0000-0000-0000-000000000130", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "effective_cache_size", "target_id": "00000000-0000-0000-0000-000000000130", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "effective_io_concurrency", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "default_statistics_target", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "force_database_error", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "One", "name": "_pg_prepared_statement_cache_size", "target_id": "00000000-0000-0000-0000-000000000103", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<cfg[is cfg::ExtensionConfig]", "stub": "cfg", "target_id": "89fb9b8b-d3b2-5075-9d1a-f5b116a0f188", "kind": "link", "is_exclusive": true }], "backlink_stubs": [{ "card": "Many", "name": "<cfg", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("48896eaf-b8af-5f80-9073-0884475d6ee5", { "id": "48896eaf-b8af-5f80-9073-0884475d6ee5", "name": "std::anyenum", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("50264e27-859e-5d2b-a589-ebb3d8ba4d8c", { "id": "50264e27-859e-5d2b-a589-ebb3d8ba4d8c", "name": "cfg::AllowBareDDL", "is_abstract": false, "kind": "scalar", "enum_values": ["AlwaysAllow", "NeverAllow"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a2ba7516-d398-5ec2-b25e-221b2f7b9e87", { "id": "a2ba7516-d398-5ec2-b25e-221b2f7b9e87", "name": "cfg::Auth", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "d408002f-3891-5b9a-b19c-23589a88998b" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "priority", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": true, "has_default": false, "pointers": [] }, { "card": "Many", "name": "user", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "method", "target_id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": true, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "comment", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": false, "pointers": [] }], "exclusives": [{ "priority": { "card": "One", "name": "priority", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": true, "has_default": false, "pointers": [] } }, { "method": { "card": "AtMostOne", "name": "method", "target_id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": true, "has_default": false, "pointers": [] } }], "backlinks": [{ "card": "Many", "name": "<auth[is cfg::AbstractConfig]", "stub": "auth", "target_id": "8b66e734-a01e-5638-a812-359e0d005a37", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<auth[is cfg::Config]", "stub": "auth", "target_id": "363133b1-e993-50a0-94d3-aa0472b1a0a7", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<auth[is cfg::InstanceConfig]", "stub": "auth", "target_id": "d9e9f342-7992-544c-b6af-459302121188", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<auth[is cfg::DatabaseConfig]", "stub": "auth", "target_id": "c046988e-25f8-55b8-8d94-9e2a13d7625f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<auth[is cfg::BranchConfig]", "stub": "auth", "target_id": "b8b6fefa-f0c7-5eea-9f2f-98a5222c7c5e", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<auth", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("128fcc80-bf32-5bdc-abac-09cf1532a7c1", { "id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1", "name": "cfg::AuthMethod", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "d408002f-3891-5b9a-b19c-23589a88998b" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "transports", "target_id": "1adbf789-39c3-5070-bc17-776f94d59e46", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<method[is cfg::Auth]", "stub": "method", "target_id": "a2ba7516-d398-5ec2-b25e-221b2f7b9e87", "kind": "link", "is_exclusive": true }], "backlink_stubs": [{ "card": "Many", "name": "<method", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("c046988e-25f8-55b8-8d94-9e2a13d7625f", { "id": "c046988e-25f8-55b8-8d94-9e2a13d7625f", "name": "cfg::DatabaseConfig", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8b66e734-a01e-5638-a812-359e0d005a37" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("b8b6fefa-f0c7-5eea-9f2f-98a5222c7c5e", { "id": "b8b6fefa-f0c7-5eea-9f2f-98a5222c7c5e", "name": "cfg::BranchConfig", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "c046988e-25f8-55b8-8d94-9e2a13d7625f" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("363133b1-e993-50a0-94d3-aa0472b1a0a7", { "id": "363133b1-e993-50a0-94d3-aa0472b1a0a7", "name": "cfg::Config", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8b66e734-a01e-5638-a812-359e0d005a37" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("1adbf789-39c3-5070-bc17-776f94d59e46", { "id": "1adbf789-39c3-5070-bc17-776f94d59e46", "name": "cfg::ConnectionTransport", "is_abstract": false, "kind": "scalar", "enum_values": ["TCP", "TCP_PG", "HTTP", "SIMPLE_HTTP", "HTTP_METRICS", "HTTP_HEALTH"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("89fb9b8b-d3b2-5075-9d1a-f5b116a0f188", { "id": "89fb9b8b-d3b2-5075-9d1a-f5b116a0f188", "name": "cfg::ExtensionConfig", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "d408002f-3891-5b9a-b19c-23589a88998b" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "cfg", "target_id": "8b66e734-a01e-5638-a812-359e0d005a37", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [{ "cfg": { "card": "One", "name": "cfg", "target_id": "8b66e734-a01e-5638-a812-359e0d005a37", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] } }], "backlinks": [{ "card": "Many", "name": "<extensions[is cfg::AbstractConfig]", "stub": "extensions", "target_id": "8b66e734-a01e-5638-a812-359e0d005a37", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<extensions[is cfg::Config]", "stub": "extensions", "target_id": "363133b1-e993-50a0-94d3-aa0472b1a0a7", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<extensions[is cfg::InstanceConfig]", "stub": "extensions", "target_id": "d9e9f342-7992-544c-b6af-459302121188", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<extensions[is cfg::DatabaseConfig]", "stub": "extensions", "target_id": "c046988e-25f8-55b8-8d94-9e2a13d7625f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<extensions[is cfg::BranchConfig]", "stub": "extensions", "target_id": "b8b6fefa-f0c7-5eea-9f2f-98a5222c7c5e", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<extensions", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("d9e9f342-7992-544c-b6af-459302121188", { "id": "d9e9f342-7992-544c-b6af-459302121188", "name": "cfg::InstanceConfig", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8b66e734-a01e-5638-a812-359e0d005a37" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("4e795376-37e8-5381-8ae4-d621c80bbc7b", { "id": "4e795376-37e8-5381-8ae4-d621c80bbc7b", "name": "cfg::JWT", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "transports", "target_id": "1adbf789-39c3-5070-bc17-776f94d59e46", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": true, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("9df8c566-c274-5d75-a948-2d901505d7de", { "id": "9df8c566-c274-5d75-a948-2d901505d7de", "name": "cfg::Password", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "transports", "target_id": "1adbf789-39c3-5070-bc17-776f94d59e46", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": true, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("7cb23cda-17b8-575c-9561-05e2e9351897", { "id": "7cb23cda-17b8-575c-9561-05e2e9351897", "name": "cfg::QueryCacheMode", "is_abstract": false, "kind": "scalar", "enum_values": ["InMemory", "RegInline", "PgFunc", "Default"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("ca43bc46-6dd2-55fc-98dc-358978df0f24", { "id": "ca43bc46-6dd2-55fc-98dc-358978df0f24", "name": "cfg::SCRAM", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "transports", "target_id": "1adbf789-39c3-5070-bc17-776f94d59e46", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": true, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("7fc09ace-4af4-5d90-a9ab-94f9bb4cdb42", { "id": "7fc09ace-4af4-5d90-a9ab-94f9bb4cdb42", "name": "cfg::Trust", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e96db572-9980-5ce1-8049-1561b3980d0e", { "id": "e96db572-9980-5ce1-8049-1561b3980d0e", "name": "cfg::mTLS", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "transports", "target_id": "1adbf789-39c3-5070-bc17-776f94d59e46", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": true, "has_default": true, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000130", { "id": "00000000-0000-0000-0000-000000000130", "name": "cfg::memory", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("8ce8c71e-e4fa-5f73-840c-22d7eaa58588", { "id": "8ce8c71e-e4fa-5f73-840c-22d7eaa58588", "name": "std::Object", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("4d2a3345-2bbf-11ef-9efd-f39f55c85f1d", { "id": "4d2a3345-2bbf-11ef-9efd-f39f55c85f1d", "name": "default::Actor", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8ce8c71e-e4fa-5f73-840c-22d7eaa58588" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<actors[is Movie]", "stub": "actors", "target_id": "4d2bb666-2bbf-11ef-9c96-91fc35593bc2", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<actors", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("4d2bb666-2bbf-11ef-9c96-91fc35593bc2", { "id": "4d2bb666-2bbf-11ef-9c96-91fc35593bc2", "name": "default::Movie", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8ce8c71e-e4fa-5f73-840c-22d7eaa58588" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "actors", "target_id": "4d2a3345-2bbf-11ef-9efd-f39f55c85f1d", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "title", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2f0936c1-a8c9-11ef-9642-ff223abd7071", { "id": "2f0936c1-a8c9-11ef-9642-ff223abd7071", "name": "default::Payment", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8ce8c71e-e4fa-5f73-840c-22d7eaa58588" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "accountNumber", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "date", "target_id": "00000000-0000-0000-0000-00000000010a", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "lastName", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "country", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "amount", "target_id": "00000000-0000-0000-0000-000000000104", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("b2a67f30-96c2-11ef-8f77-cda9e2848e59", { "id": "b2a67f30-96c2-11ef-8f77-cda9e2848e59", "name": "default::User", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8ce8c71e-e4fa-5f73-840c-22d7eaa58588" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "clerkId", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "email", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "firstName", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "lastName", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "password", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [{ "email": { "card": "AtMostOne", "name": "email", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] } }], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("68098129-5cf4-5272-8c64-2504e3dd95ad", { "id": "68098129-5cf4-5272-8c64-2504e3dd95ad", "name": "fts::ElasticLanguage", "is_abstract": false, "kind": "scalar", "enum_values": ["ara", "bul", "cat", "ces", "ckb", "dan", "deu", "ell", "eng", "eus", "fas", "fin", "fra", "gle", "glg", "hin", "hun", "hye", "ind", "ita", "lav", "nld", "nor", "por", "ron", "rus", "spa", "swe", "tha", "tur", "zho", "edb_Brazilian", "edb_ChineseJapaneseKorean"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("4e291f3c-c871-56fb-b07a-0e841552c500", { "id": "4e291f3c-c871-56fb-b07a-0e841552c500", "name": "fts::Language", "is_abstract": false, "kind": "scalar", "enum_values": ["ara", "hye", "eus", "cat", "dan", "nld", "eng", "fin", "fra", "deu", "ell", "hin", "hun", "ind", "gle", "ita", "nor", "por", "ron", "rus", "spa", "swe", "tur"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("30696cb3-efd2-5146-8338-9ccc4ada0523", { "id": "30696cb3-efd2-5146-8338-9ccc4ada0523", "name": "fts::LuceneLanguage", "is_abstract": false, "kind": "scalar", "enum_values": ["ara", "ben", "bul", "cat", "ces", "ckb", "dan", "deu", "ell", "eng", "est", "eus", "fas", "fin", "fra", "gle", "glg", "hin", "hun", "hye", "ind", "ita", "lav", "lit", "nld", "nor", "por", "ron", "rus", "spa", "srp", "swe", "tha", "tur", "edb_Brazilian", "edb_ChineseJapaneseKorean", "edb_Indian"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("946d99dc-5330-5d27-9c74-3e8e522e0df3", { "id": "946d99dc-5330-5d27-9c74-3e8e522e0df3", "name": "fts::PGLanguage", "is_abstract": false, "kind": "scalar", "enum_values": ["xxx_simple", "ara", "hye", "eus", "cat", "dan", "nld", "eng", "fin", "fra", "deu", "ell", "hin", "hun", "ind", "gle", "ita", "lit", "npi", "nor", "por", "ron", "rus", "srp", "spa", "swe", "tam", "tur", "yid"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("6ff6d8f7-ff4e-5653-af31-2976f6d87159", { "id": "6ff6d8f7-ff4e-5653-af31-2976f6d87159", "name": "fts::Weight", "is_abstract": false, "kind": "scalar", "enum_values": ["A", "B", "C", "D"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("82a03701-64a0-526d-9e43-397ce1e2022f", { "id": "82a03701-64a0-526d-9e43-397ce1e2022f", "name": "fts::document", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e294f13d-34ee-529f-b7f8-7c3e2fd17e6e", { "id": "e294f13d-34ee-529f-b7f8-7c3e2fd17e6e", "name": "multirange<cal::local_date>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-00000000010c" });
spec.set("1990bea3-4cb3-5881-9641-8727f5d2af59", { "id": "1990bea3-4cb3-5881-9641-8727f5d2af59", "name": "multirange<cal::local_datetime>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-00000000010b" });
spec.set("c3231f27-c8a1-5a0c-9830-c71206020eac", { "id": "c3231f27-c8a1-5a0c-9830-c71206020eac", "name": "multirange<std::anypoint>", "is_abstract": true, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "581b0325-a044-58d4-aa37-3a85ea671313" });
spec.set("58da8bd4-709a-50bc-b0b4-a1918b7dc2ba", { "id": "58da8bd4-709a-50bc-b0b4-a1918b7dc2ba", "name": "multirange<std::datetime>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-00000000010a" });
spec.set("80da35c5-4ed6-5799-8eea-1c5923a3f8d3", { "id": "80da35c5-4ed6-5799-8eea-1c5923a3f8d3", "name": "multirange<std::decimal>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-000000000108" });
spec.set("18b39277-efe3-582c-8bdc-b18f4ed46e09", { "id": "18b39277-efe3-582c-8bdc-b18f4ed46e09", "name": "multirange<std::float32>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-0000000001ff" });
spec.set("75f5b5c7-f201-56a8-9fd0-bd139e69fdbe", { "id": "75f5b5c7-f201-56a8-9fd0-bd139e69fdbe", "name": "multirange<std::float64>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-0000000001ff" });
spec.set("a36a494d-f2c1-5886-8e17-b0c8ba9337ff", { "id": "a36a494d-f2c1-5886-8e17-b0c8ba9337ff", "name": "multirange<std::int32>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-0000000001ff" });
spec.set("da3c9da3-1b79-53d0-ae36-82026533939b", { "id": "da3c9da3-1b79-53d0-ae36-82026533939b", "name": "multirange<std::int64>", "is_abstract": false, "kind": "multirange", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": "00000000-0000-0000-0000-0000000001ff" });
spec.set("1e76d7c5-b67c-542c-bc8f-238b93ff1726", { "id": "1e76d7c5-b67c-542c-bc8f-238b93ff1726", "name": "range<cal::local_date>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-00000000010c", "multirange_element_id": null });
spec.set("c4441320-c6b5-5f6a-95e4-0dd4aad4e49f", { "id": "c4441320-c6b5-5f6a-95e4-0dd4aad4e49f", "name": "range<cal::local_datetime>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-00000000010b", "multirange_element_id": null });
spec.set("49748e47-8d91-5269-9a34-2e8ca194e0f2", { "id": "49748e47-8d91-5269-9a34-2e8ca194e0f2", "name": "range<std::anypoint>", "is_abstract": true, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "581b0325-a044-58d4-aa37-3a85ea671313", "multirange_element_id": null });
spec.set("10674aaf-8d88-5593-abe9-f7d82be5162b", { "id": "10674aaf-8d88-5593-abe9-f7d82be5162b", "name": "range<std::datetime>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-00000000010a", "multirange_element_id": null });
spec.set("c61dd200-697a-5b70-9ff0-6c623a700c14", { "id": "c61dd200-697a-5b70-9ff0-6c623a700c14", "name": "range<std::decimal>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-000000000108", "multirange_element_id": null });
spec.set("ef0fdfe1-43f9-5954-b804-56e9b7015ffc", { "id": "ef0fdfe1-43f9-5954-b804-56e9b7015ffc", "name": "range<std::float32>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-0000000001ff", "multirange_element_id": null });
spec.set("b2f8ab6d-ebca-517d-9f16-086423c5bb9c", { "id": "b2f8ab6d-ebca-517d-9f16-086423c5bb9c", "name": "range<std::float64>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-0000000001ff", "multirange_element_id": null });
spec.set("38b58945-dfd2-572c-bf7e-8cadf204a2ec", { "id": "38b58945-dfd2-572c-bf7e-8cadf204a2ec", "name": "range<std::int32>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-0000000001ff", "multirange_element_id": null });
spec.set("356c02b7-20fa-5d27-90fc-aa628dd37c5e", { "id": "356c02b7-20fa-5d27-90fc-aa628dd37c5e", "name": "range<std::int64>", "is_abstract": false, "kind": "range", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": "00000000-0000-0000-0000-0000000001ff", "multirange_element_id": null });
spec.set("998b88fc-083a-584b-85bb-372ade248f66", { "id": "998b88fc-083a-584b-85bb-372ade248f66", "name": "schema::AccessKind", "is_abstract": false, "kind": "scalar", "enum_values": ["Select", "UpdateRead", "UpdateWrite", "Delete", "Insert"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("32faaa35-9475-53cf-88fc-e68ecf1be4d9", { "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9", "name": "schema::Object", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "internal", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "One", "name": "builtin", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "computed_fields", "target_id": "bb221d39-09f1-507e-8851-62075bb61823", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("145b7b6f-8fa4-5b14-bcd3-5d6d10dc25da", { "id": "145b7b6f-8fa4-5b14-bcd3-5d6d10dc25da", "name": "schema::SubclassableObject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "abstract", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "is_abstract", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "final", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "is_final", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("825a1378-6b30-5f15-82f1-1c92e57691f2", { "id": "825a1378-6b30-5f15-82f1-1c92e57691f2", "name": "schema::InheritingObject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "145b7b6f-8fa4-5b14-bcd3-5d6d10dc25da" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "bases", "target_id": "825a1378-6b30-5f15-82f1-1c92e57691f2", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "Many", "name": "ancestors", "target_id": "825a1378-6b30-5f15-82f1-1c92e57691f2", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "AtMostOne", "name": "inherited_fields", "target_id": "bb221d39-09f1-507e-8851-62075bb61823", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<bases[is schema::InheritingObject]", "stub": "bases", "target_id": "825a1378-6b30-5f15-82f1-1c92e57691f2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::InheritingObject]", "stub": "ancestors", "target_id": "825a1378-6b30-5f15-82f1-1c92e57691f2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is sys::Role]", "stub": "ancestors", "target_id": "04d3804d-c37f-5969-86b2-a24309653b14", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is sys::Role]", "stub": "bases", "target_id": "04d3804d-c37f-5969-86b2-a24309653b14", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::Link]", "stub": "bases", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::Constraint]", "stub": "ancestors", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::Constraint]", "stub": "bases", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::ConsistencySubject]", "stub": "ancestors", "target_id": "883ec593-7428-5707-af16-d446e5d8ed28", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::ConsistencySubject]", "stub": "bases", "target_id": "883ec593-7428-5707-af16-d446e5d8ed28", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::Rewrite]", "stub": "bases", "target_id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::Rewrite]", "stub": "ancestors", "target_id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::Pointer]", "stub": "bases", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::Pointer]", "stub": "ancestors", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::Property]", "stub": "ancestors", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::Property]", "stub": "bases", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::ScalarType]", "stub": "ancestors", "target_id": "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::ScalarType]", "stub": "bases", "target_id": "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::Index]", "stub": "ancestors", "target_id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::Index]", "stub": "bases", "target_id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::Link]", "stub": "ancestors", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::AccessPolicy]", "stub": "bases", "target_id": "a8462073-0539-5640-9d9d-2db251c0b350", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::AccessPolicy]", "stub": "ancestors", "target_id": "a8462073-0539-5640-9d9d-2db251c0b350", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::Trigger]", "stub": "bases", "target_id": "2b738231-1ef7-59d0-a04c-dae012181a02", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::Trigger]", "stub": "ancestors", "target_id": "2b738231-1ef7-59d0-a04c-dae012181a02", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<ancestors[is schema::ObjectType]", "stub": "ancestors", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases[is schema::ObjectType]", "stub": "bases", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<ancestors", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<bases", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("970b2d83-85d8-5a46-a4e8-337d28abc12e", { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e", "name": "schema::AnnotationSubject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "annotations", "target_id": "273b8735-318f-53f6-9297-6f20162c9105", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@value", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_computed": false, "is_readonly": false }] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a8462073-0539-5640-9d9d-2db251c0b350", { "id": "a8462073-0539-5640-9d9d-2db251c0b350", "name": "schema::AccessPolicy", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "subject", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "access_kinds", "target_id": "998b88fc-083a-584b-85bb-372ade248f66", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "condition", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "action", "target_id": "d8c466cc-109e-587c-aff8-42e50705b5b0", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "errmessage", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<access_policies[is schema::ObjectType]", "stub": "access_policies", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<access_policies", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("d8c466cc-109e-587c-aff8-42e50705b5b0", { "id": "d8c466cc-109e-587c-aff8-42e50705b5b0", "name": "schema::AccessPolicyAction", "is_abstract": false, "kind": "scalar", "enum_values": ["Allow", "Deny"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("4388400b-e01d-582c-b1da-8161814835a6", { "id": "4388400b-e01d-582c-b1da-8161814835a6", "name": "schema::Alias", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("273b8735-318f-53f6-9297-6f20162c9105", { "id": "273b8735-318f-53f6-9297-6f20162c9105", "name": "schema::Annotation", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "inheritable", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<annotations[is schema::AnnotationSubject]", "stub": "annotations", "target_id": "970b2d83-85d8-5a46-a4e8-337d28abc12e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is sys::Database]", "stub": "annotations", "target_id": "fd469647-1cf1-5702-85b6-bbdb7e7f1c7e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is sys::ExtensionPackage]", "stub": "annotations", "target_id": "87787989-1e54-5529-9cc4-524cc873528d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is sys::Role]", "stub": "annotations", "target_id": "04d3804d-c37f-5969-86b2-a24309653b14", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Annotation]", "stub": "annotations", "target_id": "273b8735-318f-53f6-9297-6f20162c9105", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Alias]", "stub": "annotations", "target_id": "4388400b-e01d-582c-b1da-8161814835a6", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Global]", "stub": "annotations", "target_id": "e1294378-bb3d-57e0-81d2-6a19ea088231", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::CallableObject]", "stub": "annotations", "target_id": "800f2df9-dd86-5681-9e3c-b529af481a9d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Function]", "stub": "annotations", "target_id": "3a60f555-7c03-5287-b4c9-f078692a89ef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Operator]", "stub": "annotations", "target_id": "e37bd85e-5e2f-5daa-9dd9-d21d419032be", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Cast]", "stub": "annotations", "target_id": "2b25c5a4-5ad4-5c4b-b545-574ccac3fd7f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Migration]", "stub": "annotations", "target_id": "31f74b3a-d9b1-5e35-a746-057f44c58e76", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Constraint]", "stub": "annotations", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Rewrite]", "stub": "annotations", "target_id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Pointer]", "stub": "annotations", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Property]", "stub": "annotations", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::ScalarType]", "stub": "annotations", "target_id": "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Index]", "stub": "annotations", "target_id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Link]", "stub": "annotations", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::AccessPolicy]", "stub": "annotations", "target_id": "a8462073-0539-5640-9d9d-2db251c0b350", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Trigger]", "stub": "annotations", "target_id": "2b738231-1ef7-59d0-a04c-dae012181a02", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::ObjectType]", "stub": "annotations", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<annotations[is schema::Extension]", "stub": "annotations", "target_id": "b9c53751-8d28-5077-b1db-a03ea59557ed", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<annotations", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("8e652319-e551-5b5c-a7bd-9591f0ef5303", { "id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "name": "schema::Type", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "145b7b6f-8fa4-5b14-bcd3-5d6d10dc25da" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "from_alias", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "is_from_alias", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<element_type[is schema::Array]", "stub": "element_type", "target_id": "283cc7a9-7bf6-5eda-a323-b4e5173f2927", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<type[is schema::TupleElement]", "stub": "type", "target_id": "9cc04b0b-11e0-5670-a8a1-441a323e12fb", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<element_type[is schema::Range]", "stub": "element_type", "target_id": "cced31f8-8167-59d7-b269-c49ae88a0ac1", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<element_type[is schema::MultiRange]", "stub": "element_type", "target_id": "800c4a49-db9d-5a39-9cf2-aa213b858616", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<type[is schema::Parameter]", "stub": "type", "target_id": "87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<return_type[is schema::CallableObject]", "stub": "return_type", "target_id": "800f2df9-dd86-5681-9e3c-b529af481a9d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<type[is schema::Alias]", "stub": "type", "target_id": "4388400b-e01d-582c-b1da-8161814835a6", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<target[is schema::Pointer]", "stub": "target", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<target[is schema::Global]", "stub": "target", "target_id": "e1294378-bb3d-57e0-81d2-6a19ea088231", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<from_type[is schema::Cast]", "stub": "from_type", "target_id": "2b25c5a4-5ad4-5c4b-b545-574ccac3fd7f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<to_type[is schema::Cast]", "stub": "to_type", "target_id": "2b25c5a4-5ad4-5c4b-b545-574ccac3fd7f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<element_type[is schema::ArrayExprAlias]", "stub": "element_type", "target_id": "2e55d7f5-18ed-54b4-ade0-ba404dd482d3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<element_type[is schema::RangeExprAlias]", "stub": "element_type", "target_id": "bc63491c-2a88-5353-b5f0-6f2188a4f65d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<element_type[is schema::MultiRangeExprAlias]", "stub": "element_type", "target_id": "a92ef6fd-611e-5b00-8115-cc0ebb5f0be5", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<return_type[is schema::Function]", "stub": "return_type", "target_id": "3a60f555-7c03-5287-b4c9-f078692a89ef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<return_type[is schema::Operator]", "stub": "return_type", "target_id": "e37bd85e-5e2f-5daa-9dd9-d21d419032be", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<return_type[is schema::Constraint]", "stub": "return_type", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<target[is schema::Property]", "stub": "target", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<element_type", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<from_type", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<return_type", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<target", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<to_type", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<type", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("da26fa09-3541-5cba-b93f-d5ba58d25589", { "id": "da26fa09-3541-5cba-b93f-d5ba58d25589", "name": "schema::PrimitiveType", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "8e652319-e551-5b5c-a7bd-9591f0ef5303" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e3a7ccf7-4a20-5151-80b3-5156c9373889", { "id": "e3a7ccf7-4a20-5151-80b3-5156c9373889", "name": "schema::CollectionType", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "da26fa09-3541-5cba-b93f-d5ba58d25589" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("283cc7a9-7bf6-5eda-a323-b4e5173f2927", { "id": "283cc7a9-7bf6-5eda-a323-b4e5173f2927", "name": "schema::Array", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "e3a7ccf7-4a20-5151-80b3-5156c9373889" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "element_type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "dimensions", "target_id": "574de665-be6f-5562-a55d-448593e7b73d", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2e55d7f5-18ed-54b4-ade0-ba404dd482d3", { "id": "2e55d7f5-18ed-54b4-ade0-ba404dd482d3", "name": "schema::ArrayExprAlias", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "283cc7a9-7bf6-5eda-a323-b4e5173f2927" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("800f2df9-dd86-5681-9e3c-b529af481a9d", { "id": "800f2df9-dd86-5681-9e3c-b529af481a9d", "name": "schema::CallableObject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "params", "target_id": "87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "AtMostOne", "name": "return_type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "return_typemod", "target_id": "67722d75-1145-54b6-af26-94602de09d51", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("94abc2f6-2e3e-55fc-8e97-b44ba70a3950", { "id": "94abc2f6-2e3e-55fc-8e97-b44ba70a3950", "name": "schema::Cardinality", "is_abstract": false, "kind": "scalar", "enum_values": ["One", "Many"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("ed8e20ca-f2dc-5626-bccb-05ef9ed65791", { "id": "ed8e20ca-f2dc-5626-bccb-05ef9ed65791", "name": "schema::VolatilitySubject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "volatility", "target_id": "de5b90f2-6e49-5543-991b-28a156c7867f", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2b25c5a4-5ad4-5c4b-b545-574ccac3fd7f", { "id": "2b25c5a4-5ad4-5c4b-b545-574ccac3fd7f", "name": "schema::Cast", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }, { "id": "ed8e20ca-f2dc-5626-bccb-05ef9ed65791" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "from_type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "to_type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "allow_implicit", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "allow_assignment", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("883ec593-7428-5707-af16-d446e5d8ed28", { "id": "883ec593-7428-5707-af16-d446e5d8ed28", "name": "schema::ConsistencySubject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "constraints", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] }], "exclusives": [{ "constraints": { "card": "Many", "name": "constraints", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] } }], "backlinks": [{ "card": "Many", "name": "<subject[is schema::Constraint]", "stub": "subject", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<subject", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("9346c403-6ee6-50b6-81b2-a35551cfab2f", { "id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "name": "schema::Constraint", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "800f2df9-dd86-5681-9e3c-b529af481a9d" }, { "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "params", "target_id": "87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@value", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "AtMostOne", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "subjectexpr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "finalexpr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "errmessage", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "delegated", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "except_expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "subject", "target_id": "883ec593-7428-5707-af16-d446e5d8ed28", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<constraints[is schema::ConsistencySubject]", "stub": "constraints", "target_id": "883ec593-7428-5707-af16-d446e5d8ed28", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<constraints[is schema::Pointer]", "stub": "constraints", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<constraints[is schema::Property]", "stub": "constraints", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<constraints[is schema::ScalarType]", "stub": "constraints", "target_id": "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<constraints[is schema::Link]", "stub": "constraints", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<constraints[is schema::ObjectType]", "stub": "constraints", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<constraints", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("c974be74-46d8-5848-b2a9-be5eda14f73e", { "id": "c974be74-46d8-5848-b2a9-be5eda14f73e", "name": "schema::Delta", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "parents", "target_id": "c974be74-46d8-5848-b2a9-be5eda14f73e", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<parents[is schema::Delta]", "stub": "parents", "target_id": "c974be74-46d8-5848-b2a9-be5eda14f73e", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<parents", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("b9c53751-8d28-5077-b1db-a03ea59557ed", { "id": "b9c53751-8d28-5077-b1db-a03ea59557ed", "name": "schema::Extension", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }, { "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "package", "target_id": "87787989-1e54-5529-9cc4-524cc873528d", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [{ "package": { "card": "One", "name": "package", "target_id": "87787989-1e54-5529-9cc4-524cc873528d", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] } }], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("3a60f555-7c03-5287-b4c9-f078692a89ef", { "id": "3a60f555-7c03-5287-b4c9-f078692a89ef", "name": "schema::Function", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "800f2df9-dd86-5681-9e3c-b529af481a9d" }, { "id": "ed8e20ca-f2dc-5626-bccb-05ef9ed65791" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "preserves_optionality", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "body", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "language", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "used_globals", "target_id": "e1294378-bb3d-57e0-81d2-6a19ea088231", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("003feed0-dc7d-564e-abb5-93a42ba99d64", { "id": "003feed0-dc7d-564e-abb5-93a42ba99d64", "name": "schema::FutureBehavior", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e1294378-bb3d-57e0-81d2-6a19ea088231", { "id": "e1294378-bb3d-57e0-81d2-6a19ea088231", "name": "schema::Global", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "target", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "required", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "cardinality", "target_id": "94abc2f6-2e3e-55fc-8e97-b44ba70a3950", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "default", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<used_globals[is schema::Function]", "stub": "used_globals", "target_id": "3a60f555-7c03-5287-b4c9-f078692a89ef", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<used_globals", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("decfa7fb-1f66-5986-be86-fc9b6c268a97", { "id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "name": "schema::Index", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "except_expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "params", "target_id": "87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "AtMostOne", "name": "kwargs", "target_id": "212f4161-55eb-569e-945d-ae24bdab437a", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<indexes[is schema::Source]", "stub": "indexes", "target_id": "0368bb5e-ae06-5c00-9316-15095185b828", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<indexes[is schema::ObjectType]", "stub": "indexes", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<indexes[is schema::Link]", "stub": "indexes", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<indexes", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", { "id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "name": "schema::Pointer", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "883ec593-7428-5707-af16-d446e5d8ed28" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "cardinality", "target_id": "94abc2f6-2e3e-55fc-8e97-b44ba70a3950", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "required", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "readonly", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "default", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "secret", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "source", "target_id": "0368bb5e-ae06-5c00-9316-15095185b828", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "target", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "rewrites", "target_id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] }], "exclusives": [{ "rewrites": { "card": "Many", "name": "rewrites", "target_id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] } }], "backlinks": [{ "card": "AtMostOne", "name": "<pointers[is schema::Source]", "stub": "pointers", "target_id": "0368bb5e-ae06-5c00-9316-15095185b828", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<subject[is schema::Rewrite]", "stub": "subject", "target_id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<pointers[is schema::Link]", "stub": "pointers", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<pointers[is schema::ObjectType]", "stub": "pointers", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<pointers", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<subject", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("0368bb5e-ae06-5c00-9316-15095185b828", { "id": "0368bb5e-ae06-5c00-9316-15095185b828", "name": "schema::Source", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "indexes", "target_id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "Many", "name": "pointers", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] }], "exclusives": [{ "indexes": { "card": "Many", "name": "indexes", "target_id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] } }, { "pointers": { "card": "Many", "name": "pointers", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] } }], "backlinks": [{ "card": "Many", "name": "<source[is schema::Pointer]", "stub": "source", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<source[is schema::Property]", "stub": "source", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<source[is schema::Link]", "stub": "source", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<source", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("98fe77cc-128e-58fe-b87a-1251c3288548", { "id": "98fe77cc-128e-58fe-b87a-1251c3288548", "name": "schema::Link", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3" }, { "id": "0368bb5e-ae06-5c00-9316-15095185b828" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "target", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "properties", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "on_target_delete", "target_id": "6b925c92-5e48-5e6d-96f2-4125d9119b66", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "on_source_delete", "target_id": "1c938388-8739-57a7-8095-cc173226ad8e", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<links[is schema::ObjectType]", "stub": "links", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<links", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("31f74b3a-d9b1-5e35-a746-057f44c58e76", { "id": "31f74b3a-d9b1-5e35-a746-057f44c58e76", "name": "schema::Migration", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }, { "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "parents", "target_id": "31f74b3a-d9b1-5e35-a746-057f44c58e76", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "script", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "message", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "generated_by", "target_id": "8fcfde20-139b-5c17-93b9-9a49512b83dc", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<parents[is schema::Migration]", "stub": "parents", "target_id": "31f74b3a-d9b1-5e35-a746-057f44c58e76", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<parents", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("8fcfde20-139b-5c17-93b9-9a49512b83dc", { "id": "8fcfde20-139b-5c17-93b9-9a49512b83dc", "name": "schema::MigrationGeneratedBy", "is_abstract": false, "kind": "scalar", "enum_values": ["DevMode", "DDLStatement"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("7106039a-ed86-5868-8227-3e2fc5e3e5ec", { "id": "7106039a-ed86-5868-8227-3e2fc5e3e5ec", "name": "schema::Module", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }, { "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("800c4a49-db9d-5a39-9cf2-aa213b858616", { "id": "800c4a49-db9d-5a39-9cf2-aa213b858616", "name": "schema::MultiRange", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "e3a7ccf7-4a20-5151-80b3-5156c9373889" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "element_type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a92ef6fd-611e-5b00-8115-cc0ebb5f0be5", { "id": "a92ef6fd-611e-5b00-8115-cc0ebb5f0be5", "name": "schema::MultiRangeExprAlias", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "800c4a49-db9d-5a39-9cf2-aa213b858616" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2662a1b4-4f3f-5875-b6eb-ce52101a90a3", { "id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "name": "schema::ObjectType", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "0368bb5e-ae06-5c00-9316-15095185b828" }, { "id": "883ec593-7428-5707-af16-d446e5d8ed28" }, { "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "8e652319-e551-5b5c-a7bd-9591f0ef5303" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "Many", "name": "union_of", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "intersection_of", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "access_policies", "target_id": "a8462073-0539-5640-9d9d-2db251c0b350", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "Many", "name": "triggers", "target_id": "2b738231-1ef7-59d0-a04c-dae012181a02", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] }, { "card": "One", "name": "compound_type", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "is_compound_type", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "links", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "properties", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [{ "access_policies": { "card": "Many", "name": "access_policies", "target_id": "a8462073-0539-5640-9d9d-2db251c0b350", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] } }, { "triggers": { "card": "Many", "name": "triggers", "target_id": "2b738231-1ef7-59d0-a04c-dae012181a02", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }, { "card": "AtMostOne", "name": "@is_owned", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_computed": false, "is_readonly": false }] } }], "backlinks": [{ "card": "Many", "name": "<__type__[is std::BaseObject]", "stub": "__type__", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::TupleElement]", "stub": "__type__", "target_id": "9cc04b0b-11e0-5670-a8a1-441a323e12fb", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Object]", "stub": "__type__", "target_id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::VolatilitySubject]", "stub": "__type__", "target_id": "ed8e20ca-f2dc-5626-bccb-05ef9ed65791", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::SubclassableObject]", "stub": "__type__", "target_id": "145b7b6f-8fa4-5b14-bcd3-5d6d10dc25da", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::InheritingObject]", "stub": "__type__", "target_id": "825a1378-6b30-5f15-82f1-1c92e57691f2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Delta]", "stub": "__type__", "target_id": "c974be74-46d8-5848-b2a9-be5eda14f73e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::AnnotationSubject]", "stub": "__type__", "target_id": "970b2d83-85d8-5a46-a4e8-337d28abc12e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is std::FreeObject]", "stub": "__type__", "target_id": "3b741934-07ef-5b95-b7d6-cdc864fd2ae8", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is std::Object]", "stub": "__type__", "target_id": "8ce8c71e-e4fa-5f73-840c-22d7eaa58588", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<union_of[is schema::ObjectType]", "stub": "union_of", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<intersection_of[is schema::ObjectType]", "stub": "intersection_of", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<subject[is schema::AccessPolicy]", "stub": "subject", "target_id": "a8462073-0539-5640-9d9d-2db251c0b350", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<subject[is schema::Trigger]", "stub": "subject", "target_id": "2b738231-1ef7-59d0-a04c-dae012181a02", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::FutureBehavior]", "stub": "__type__", "target_id": "003feed0-dc7d-564e-abb5-93a42ba99d64", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is sys::SystemObject]", "stub": "__type__", "target_id": "43f8d5e9-5b2e-535b-a46b-acf8af101718", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is sys::ExternalObject]", "stub": "__type__", "target_id": "e3838826-d523-59f9-86f4-be3cecdf0d4f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is sys::Database]", "stub": "__type__", "target_id": "fd469647-1cf1-5702-85b6-bbdb7e7f1c7e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is sys::ExtensionPackage]", "stub": "__type__", "target_id": "87787989-1e54-5529-9cc4-524cc873528d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is sys::Role]", "stub": "__type__", "target_id": "04d3804d-c37f-5969-86b2-a24309653b14", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::ConfigObject]", "stub": "__type__", "target_id": "d408002f-3891-5b9a-b19c-23589a88998b", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::AuthMethod]", "stub": "__type__", "target_id": "128fcc80-bf32-5bdc-abac-09cf1532a7c1", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::Trust]", "stub": "__type__", "target_id": "7fc09ace-4af4-5d90-a9ab-94f9bb4cdb42", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::SCRAM]", "stub": "__type__", "target_id": "ca43bc46-6dd2-55fc-98dc-358978df0f24", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::JWT]", "stub": "__type__", "target_id": "4e795376-37e8-5381-8ae4-d621c80bbc7b", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::Password]", "stub": "__type__", "target_id": "9df8c566-c274-5d75-a948-2d901505d7de", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::mTLS]", "stub": "__type__", "target_id": "e96db572-9980-5ce1-8049-1561b3980d0e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::Auth]", "stub": "__type__", "target_id": "a2ba7516-d398-5ec2-b25e-221b2f7b9e87", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::AbstractConfig]", "stub": "__type__", "target_id": "8b66e734-a01e-5638-a812-359e0d005a37", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::ExtensionConfig]", "stub": "__type__", "target_id": "89fb9b8b-d3b2-5075-9d1a-f5b116a0f188", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::Config]", "stub": "__type__", "target_id": "363133b1-e993-50a0-94d3-aa0472b1a0a7", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::InstanceConfig]", "stub": "__type__", "target_id": "d9e9f342-7992-544c-b6af-459302121188", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::DatabaseConfig]", "stub": "__type__", "target_id": "c046988e-25f8-55b8-8d94-9e2a13d7625f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is cfg::BranchConfig]", "stub": "__type__", "target_id": "b8b6fefa-f0c7-5eea-9f2f-98a5222c7c5e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Annotation]", "stub": "__type__", "target_id": "273b8735-318f-53f6-9297-6f20162c9105", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Type]", "stub": "__type__", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::PrimitiveType]", "stub": "__type__", "target_id": "da26fa09-3541-5cba-b93f-d5ba58d25589", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::CollectionType]", "stub": "__type__", "target_id": "e3a7ccf7-4a20-5151-80b3-5156c9373889", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Array]", "stub": "__type__", "target_id": "283cc7a9-7bf6-5eda-a323-b4e5173f2927", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::ArrayExprAlias]", "stub": "__type__", "target_id": "2e55d7f5-18ed-54b4-ade0-ba404dd482d3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Tuple]", "stub": "__type__", "target_id": "d88b4a0c-9561-56f4-b0a9-7b24027b4de8", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::TupleExprAlias]", "stub": "__type__", "target_id": "b7744aa3-50fc-54e0-ae51-20d78737e25b", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Range]", "stub": "__type__", "target_id": "cced31f8-8167-59d7-b269-c49ae88a0ac1", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::RangeExprAlias]", "stub": "__type__", "target_id": "bc63491c-2a88-5353-b5f0-6f2188a4f65d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::MultiRange]", "stub": "__type__", "target_id": "800c4a49-db9d-5a39-9cf2-aa213b858616", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::MultiRangeExprAlias]", "stub": "__type__", "target_id": "a92ef6fd-611e-5b00-8115-cc0ebb5f0be5", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Alias]", "stub": "__type__", "target_id": "4388400b-e01d-582c-b1da-8161814835a6", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Global]", "stub": "__type__", "target_id": "e1294378-bb3d-57e0-81d2-6a19ea088231", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Parameter]", "stub": "__type__", "target_id": "87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::CallableObject]", "stub": "__type__", "target_id": "800f2df9-dd86-5681-9e3c-b529af481a9d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Function]", "stub": "__type__", "target_id": "3a60f555-7c03-5287-b4c9-f078692a89ef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Operator]", "stub": "__type__", "target_id": "e37bd85e-5e2f-5daa-9dd9-d21d419032be", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Cast]", "stub": "__type__", "target_id": "2b25c5a4-5ad4-5c4b-b545-574ccac3fd7f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Migration]", "stub": "__type__", "target_id": "31f74b3a-d9b1-5e35-a746-057f44c58e76", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Module]", "stub": "__type__", "target_id": "7106039a-ed86-5868-8227-3e2fc5e3e5ec", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::PseudoType]", "stub": "__type__", "target_id": "0875f8c3-7033-5cc4-af04-2b6d80e289e0", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Constraint]", "stub": "__type__", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::ConsistencySubject]", "stub": "__type__", "target_id": "883ec593-7428-5707-af16-d446e5d8ed28", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Rewrite]", "stub": "__type__", "target_id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Pointer]", "stub": "__type__", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Property]", "stub": "__type__", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::ScalarType]", "stub": "__type__", "target_id": "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Index]", "stub": "__type__", "target_id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Source]", "stub": "__type__", "target_id": "0368bb5e-ae06-5c00-9316-15095185b828", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Link]", "stub": "__type__", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<target[is schema::Link]", "stub": "target", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::AccessPolicy]", "stub": "__type__", "target_id": "a8462073-0539-5640-9d9d-2db251c0b350", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Trigger]", "stub": "__type__", "target_id": "2b738231-1ef7-59d0-a04c-dae012181a02", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::ObjectType]", "stub": "__type__", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is schema::Extension]", "stub": "__type__", "target_id": "b9c53751-8d28-5077-b1db-a03ea59557ed", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is Actor]", "stub": "__type__", "target_id": "4d2a3345-2bbf-11ef-9efd-f39f55c85f1d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is Movie]", "stub": "__type__", "target_id": "4d2bb666-2bbf-11ef-9c96-91fc35593bc2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is User]", "stub": "__type__", "target_id": "b2a67f30-96c2-11ef-8f77-cda9e2848e59", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<__type__[is Payment]", "stub": "__type__", "target_id": "2f0936c1-a8c9-11ef-9642-ff223abd7071", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<__type__", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<intersection_of", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<subject", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<target", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<union_of", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e37bd85e-5e2f-5daa-9dd9-d21d419032be", { "id": "e37bd85e-5e2f-5daa-9dd9-d21d419032be", "name": "schema::Operator", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "800f2df9-dd86-5681-9e3c-b529af481a9d" }, { "id": "ed8e20ca-f2dc-5626-bccb-05ef9ed65791" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "operator_kind", "target_id": "e48403f0-7017-5bf5-ab92-22825d9f1090", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "abstract", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": true, "pointers": [] }, { "card": "AtMostOne", "name": "is_abstract", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e48403f0-7017-5bf5-ab92-22825d9f1090", { "id": "e48403f0-7017-5bf5-ab92-22825d9f1090", "name": "schema::OperatorKind", "is_abstract": false, "kind": "scalar", "enum_values": ["Infix", "Postfix", "Prefix", "Ternary"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", { "id": "87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", "name": "schema::Parameter", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "typemod", "target_id": "67722d75-1145-54b6-af26-94602de09d51", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "kind", "target_id": "8037d84a-de95-5e63-ab76-727112419261", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "num", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "default", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<params[is schema::CallableObject]", "stub": "params", "target_id": "800f2df9-dd86-5681-9e3c-b529af481a9d", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<params[is schema::Index]", "stub": "params", "target_id": "decfa7fb-1f66-5986-be86-fc9b6c268a97", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<params[is schema::Function]", "stub": "params", "target_id": "3a60f555-7c03-5287-b4c9-f078692a89ef", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<params[is schema::Operator]", "stub": "params", "target_id": "e37bd85e-5e2f-5daa-9dd9-d21d419032be", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<params[is schema::Constraint]", "stub": "params", "target_id": "9346c403-6ee6-50b6-81b2-a35551cfab2f", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<params", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("8037d84a-de95-5e63-ab76-727112419261", { "id": "8037d84a-de95-5e63-ab76-727112419261", "name": "schema::ParameterKind", "is_abstract": false, "kind": "scalar", "enum_values": ["VariadicParam", "NamedOnlyParam", "PositionalParam"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", { "id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "name": "schema::Property", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [{ "card": "Many", "name": "<properties[is schema::Link]", "stub": "properties", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }, { "card": "Many", "name": "<properties[is schema::ObjectType]", "stub": "properties", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<properties", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("0875f8c3-7033-5cc4-af04-2b6d80e289e0", { "id": "0875f8c3-7033-5cc4-af04-2b6d80e289e0", "name": "schema::PseudoType", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "8e652319-e551-5b5c-a7bd-9591f0ef5303" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("cced31f8-8167-59d7-b269-c49ae88a0ac1", { "id": "cced31f8-8167-59d7-b269-c49ae88a0ac1", "name": "schema::Range", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "e3a7ccf7-4a20-5151-80b3-5156c9373889" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "element_type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("bc63491c-2a88-5353-b5f0-6f2188a4f65d", { "id": "bc63491c-2a88-5353-b5f0-6f2188a4f65d", "name": "schema::RangeExprAlias", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "cced31f8-8167-59d7-b269-c49ae88a0ac1" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("d60198c8-ad58-5c4c-b3b6-d520c19f5cef", { "id": "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", "name": "schema::Rewrite", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "subject", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "kind", "target_id": "3c6fa29f-8481-59c9-a9bf-ac30ab50be32", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<rewrites[is schema::Pointer]", "stub": "rewrites", "target_id": "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<rewrites[is schema::Property]", "stub": "rewrites", "target_id": "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<rewrites[is schema::Link]", "stub": "rewrites", "target_id": "98fe77cc-128e-58fe-b87a-1251c3288548", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<rewrites", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a06f04aa-88b7-5d9a-b520-b8139fd64d0c", { "id": "a06f04aa-88b7-5d9a-b520-b8139fd64d0c", "name": "schema::RewriteKind", "is_abstract": false, "kind": "scalar", "enum_values": ["Update", "Insert"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", { "id": "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", "name": "schema::ScalarType", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "da26fa09-3541-5cba-b93f-d5ba58d25589" }, { "id": "883ec593-7428-5707-af16-d446e5d8ed28" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "AtMostOne", "name": "default", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "enum_values", "target_id": "bb221d39-09f1-507e-8851-62075bb61823", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "arg_values", "target_id": "bb221d39-09f1-507e-8851-62075bb61823", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("1c938388-8739-57a7-8095-cc173226ad8e", { "id": "1c938388-8739-57a7-8095-cc173226ad8e", "name": "schema::SourceDeleteAction", "is_abstract": false, "kind": "scalar", "enum_values": ["DeleteTarget", "Allow", "DeleteTargetIfOrphan"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("6b925c92-5e48-5e6d-96f2-4125d9119b66", { "id": "6b925c92-5e48-5e6d-96f2-4125d9119b66", "name": "schema::TargetDeleteAction", "is_abstract": false, "kind": "scalar", "enum_values": ["Restrict", "DeleteSource", "Allow", "DeferredRestrict"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2b738231-1ef7-59d0-a04c-dae012181a02", { "id": "2b738231-1ef7-59d0-a04c-dae012181a02", "name": "schema::Trigger", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "subject", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "timing", "target_id": "a2c7e6ae-370c-53a7-842c-21e238faf3ee", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "kinds", "target_id": "3c6fa29f-8481-59c9-a9bf-ac30ab50be32", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "scope", "target_id": "20998fe7-4392-5673-96b5-5f1cd736b5df", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "expr", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "condition", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<triggers[is schema::ObjectType]", "stub": "triggers", "target_id": "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<triggers", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("3c6fa29f-8481-59c9-a9bf-ac30ab50be32", { "id": "3c6fa29f-8481-59c9-a9bf-ac30ab50be32", "name": "schema::TriggerKind", "is_abstract": false, "kind": "scalar", "enum_values": ["Update", "Delete", "Insert"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("20998fe7-4392-5673-96b5-5f1cd736b5df", { "id": "20998fe7-4392-5673-96b5-5f1cd736b5df", "name": "schema::TriggerScope", "is_abstract": false, "kind": "scalar", "enum_values": ["All", "Each"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("a2c7e6ae-370c-53a7-842c-21e238faf3ee", { "id": "a2c7e6ae-370c-53a7-842c-21e238faf3ee", "name": "schema::TriggerTiming", "is_abstract": false, "kind": "scalar", "enum_values": ["After", "AfterCommitOf"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("d88b4a0c-9561-56f4-b0a9-7b24027b4de8", { "id": "d88b4a0c-9561-56f4-b0a9-7b24027b4de8", "name": "schema::Tuple", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "e3a7ccf7-4a20-5151-80b3-5156c9373889" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "named", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "element_types", "target_id": "9cc04b0b-11e0-5670-a8a1-441a323e12fb", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }] }], "exclusives": [{ "element_types": { "card": "Many", "name": "element_types", "target_id": "9cc04b0b-11e0-5670-a8a1-441a323e12fb", "kind": "link", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [{ "card": "AtMostOne", "name": "@index", "target_id": "00000000-0000-0000-0000-000000000105", "kind": "property", "is_computed": false, "is_readonly": false }] } }], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("9cc04b0b-11e0-5670-a8a1-441a323e12fb", { "id": "9cc04b0b-11e0-5670-a8a1-441a323e12fb", "name": "schema::TupleElement", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "type", "target_id": "8e652319-e551-5b5c-a7bd-9591f0ef5303", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<element_types[is schema::Tuple]", "stub": "element_types", "target_id": "d88b4a0c-9561-56f4-b0a9-7b24027b4de8", "kind": "link", "is_exclusive": false }, { "card": "AtMostOne", "name": "<element_types[is schema::TupleExprAlias]", "stub": "element_types", "target_id": "b7744aa3-50fc-54e0-ae51-20d78737e25b", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<element_types", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("b7744aa3-50fc-54e0-ae51-20d78737e25b", { "id": "b7744aa3-50fc-54e0-ae51-20d78737e25b", "name": "schema::TupleExprAlias", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "d88b4a0c-9561-56f4-b0a9-7b24027b4de8" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("67722d75-1145-54b6-af26-94602de09d51", { "id": "67722d75-1145-54b6-af26-94602de09d51", "name": "schema::TypeModifier", "is_abstract": false, "kind": "scalar", "enum_values": ["SetOfType", "OptionalType", "SingletonType"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("de5b90f2-6e49-5543-991b-28a156c7867f", { "id": "de5b90f2-6e49-5543-991b-28a156c7867f", "name": "schema::Volatility", "is_abstract": false, "kind": "scalar", "enum_values": ["Immutable", "Stable", "Volatile"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e4a1d11b-227e-5744-a0c9-31f9cd756e7b", { "id": "e4a1d11b-227e-5744-a0c9-31f9cd756e7b", "name": "std::Endian", "is_abstract": false, "kind": "scalar", "enum_values": ["Little", "Big"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("3b741934-07ef-5b95-b7d6-cdc864fd2ae8", { "id": "3b741934-07ef-5b95-b7d6-cdc864fd2ae8", "name": "std::FreeObject", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("584feb89-c83d-561d-aa78-24e6d779f044", { "id": "584feb89-c83d-561d-aa78-24e6d779f044", "name": "std::JsonEmpty", "is_abstract": false, "kind": "scalar", "enum_values": ["ReturnEmpty", "ReturnTarget", "Error", "UseNull", "DeleteKey"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("04976545-1176-5536-8673-c9f7d18d581b", { "id": "04976545-1176-5536-8673-c9f7d18d581b", "name": "std::anyreal", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("7076fd20-e25d-5be1-b3c8-4ffc5880a569", { "id": "7076fd20-e25d-5be1-b3c8-4ffc5880a569", "name": "std::anyfloat", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "04976545-1176-5536-8673-c9f7d18d581b" }, { "id": "1e91671c-8df3-5a76-b695-ccbbb042699a" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("15315dad-c4ad-5335-97d6-4612e66ffb71", { "id": "15315dad-c4ad-5335-97d6-4612e66ffb71", "name": "std::anyint", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "04976545-1176-5536-8673-c9f7d18d581b" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("35bd1852-71d7-5f59-8c6c-76f6c0687532", { "id": "35bd1852-71d7-5f59-8c6c-76f6c0687532", "name": "std::anynumeric", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "04976545-1176-5536-8673-c9f7d18d581b" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000110", { "id": "00000000-0000-0000-0000-000000000110", "name": "std::bigint", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "35bd1852-71d7-5f59-8c6c-76f6c0687532" }, { "id": "15315dad-c4ad-5335-97d6-4612e66ffb71" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000109", { "id": "00000000-0000-0000-0000-000000000109", "name": "std::bool", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000102", { "id": "00000000-0000-0000-0000-000000000102", "name": "std::bytes", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-00000000010a", { "id": "00000000-0000-0000-0000-00000000010a", "name": "std::datetime", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "1e91671c-8df3-5a76-b695-ccbbb042699a" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000108", { "id": "00000000-0000-0000-0000-000000000108", "name": "std::decimal", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "35bd1852-71d7-5f59-8c6c-76f6c0687532" }, { "id": "1e91671c-8df3-5a76-b695-ccbbb042699a" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-00000000010e", { "id": "00000000-0000-0000-0000-00000000010e", "name": "std::duration", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "1e91671c-8df3-5a76-b695-ccbbb042699a" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("5ca96424-93ba-560a-994b-7820c9623e3d", { "id": "5ca96424-93ba-560a-994b-7820c9623e3d", "name": "std::enc::Base64Alphabet", "is_abstract": false, "kind": "scalar", "enum_values": ["standard", "urlsafe"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000106", { "id": "00000000-0000-0000-0000-000000000106", "name": "std::float32", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "7076fd20-e25d-5be1-b3c8-4ffc5880a569" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null, "cast_type": "00000000-0000-0000-0000-0000000001ff" });
spec.set("00000000-0000-0000-0000-000000000107", { "id": "00000000-0000-0000-0000-000000000107", "name": "std::float64", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "7076fd20-e25d-5be1-b3c8-4ffc5880a569" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null, "cast_type": "00000000-0000-0000-0000-0000000001ff" });
spec.set("00000000-0000-0000-0000-000000000103", { "id": "00000000-0000-0000-0000-000000000103", "name": "std::int16", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "15315dad-c4ad-5335-97d6-4612e66ffb71" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null, "cast_type": "00000000-0000-0000-0000-0000000001ff" });
spec.set("00000000-0000-0000-0000-000000000104", { "id": "00000000-0000-0000-0000-000000000104", "name": "std::int32", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "15315dad-c4ad-5335-97d6-4612e66ffb71" }, { "id": "c11411fe-17a4-525e-a945-3cb0f04560d2" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null, "cast_type": "00000000-0000-0000-0000-0000000001ff" });
spec.set("00000000-0000-0000-0000-000000000105", { "id": "00000000-0000-0000-0000-000000000105", "name": "std::int64", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "15315dad-c4ad-5335-97d6-4612e66ffb71" }, { "id": "c11411fe-17a4-525e-a945-3cb0f04560d2" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null, "cast_type": "00000000-0000-0000-0000-0000000001ff" });
spec.set("00000000-0000-0000-0000-00000000010f", { "id": "00000000-0000-0000-0000-00000000010f", "name": "std::json", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("fd1c52ea-74a9-541b-88e2-378d1edb02fd", { "id": "fd1c52ea-74a9-541b-88e2-378d1edb02fd", "name": "std::sequence", "is_abstract": true, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": "00000000-0000-0000-0000-000000000105", "bases": [{ "id": "00000000-0000-0000-0000-000000000105" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000101", { "id": "00000000-0000-0000-0000-000000000101", "name": "std::str", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-000000000100", { "id": "00000000-0000-0000-0000-000000000100", "name": "std::uuid", "is_abstract": false, "kind": "scalar", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "a64cb492-91a2-5ee0-890a-6caeb3e32aa5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("43f8d5e9-5b2e-535b-a46b-acf8af101718", { "id": "43f8d5e9-5b2e-535b-a46b-acf8af101718", "name": "sys::SystemObject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "32faaa35-9475-53cf-88fc-e68ecf1be4d9" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("e3838826-d523-59f9-86f4-be3cecdf0d4f", { "id": "e3838826-d523-59f9-86f4-be3cecdf0d4f", "name": "sys::ExternalObject", "is_abstract": true, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "43f8d5e9-5b2e-535b-a46b-acf8af101718" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("fd469647-1cf1-5702-85b6-bbdb7e7f1c7e", { "id": "fd469647-1cf1-5702-85b6-bbdb7e7f1c7e", "name": "sys::Database", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "e3838826-d523-59f9-86f4-be3cecdf0d4f" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [{ "name": { "card": "One", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] } }], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("87787989-1e54-5529-9cc4-524cc873528d", { "id": "87787989-1e54-5529-9cc4-524cc873528d", "name": "sys::ExtensionPackage", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "43f8d5e9-5b2e-535b-a46b-acf8af101718" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "script", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "version", "target_id": "48a4615d-2402-5744-bd11-17015ad18bb9", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [], "backlinks": [{ "card": "AtMostOne", "name": "<package[is schema::Extension]", "stub": "package", "target_id": "b9c53751-8d28-5077-b1db-a03ea59557ed", "kind": "link", "is_exclusive": true }], "backlink_stubs": [{ "card": "Many", "name": "<package", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("04d3804d-c37f-5969-86b2-a24309653b14", { "id": "04d3804d-c37f-5969-86b2-a24309653b14", "name": "sys::Role", "is_abstract": false, "kind": "object", "enum_values": null, "is_seq": false, "material_id": null, "bases": [{ "id": "43f8d5e9-5b2e-535b-a46b-acf8af101718" }, { "id": "825a1378-6b30-5f15-82f1-1c92e57691f2" }, { "id": "970b2d83-85d8-5a46-a4e8-337d28abc12e" }], "union_of": [], "intersection_of": [], "pointers": [{ "card": "One", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "superuser", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "One", "name": "is_superuser", "target_id": "00000000-0000-0000-0000-000000000109", "kind": "property", "is_exclusive": false, "is_computed": true, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "AtMostOne", "name": "password", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }, { "card": "Many", "name": "member_of", "target_id": "04d3804d-c37f-5969-86b2-a24309653b14", "kind": "link", "is_exclusive": false, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] }], "exclusives": [{ "name": { "card": "One", "name": "name", "target_id": "00000000-0000-0000-0000-000000000101", "kind": "property", "is_exclusive": true, "is_computed": false, "is_readonly": false, "has_default": false, "pointers": [] } }], "backlinks": [{ "card": "Many", "name": "<member_of[is sys::Role]", "stub": "member_of", "target_id": "04d3804d-c37f-5969-86b2-a24309653b14", "kind": "link", "is_exclusive": false }], "backlink_stubs": [{ "card": "Many", "name": "<member_of", "target_id": "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", "kind": "link", "is_exclusive": false }], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("070715f3-0100-5580-9473-696f961243eb", { "id": "070715f3-0100-5580-9473-696f961243eb", "name": "sys::TransactionIsolation", "is_abstract": false, "kind": "scalar", "enum_values": ["RepeatableRead", "Serializable"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("16a08f13-b1b1-57f4-8e82-062f67fb2a4c", { "id": "16a08f13-b1b1-57f4-8e82-062f67fb2a4c", "name": "sys::VersionStage", "is_abstract": false, "kind": "scalar", "enum_values": ["dev", "alpha", "beta", "rc", "final"], "is_seq": false, "material_id": null, "bases": [{ "id": "48896eaf-b8af-5f80-9073-0884475d6ee5" }], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [], "range_element_id": null, "multirange_element_id": null });
spec.set("2e1efa8d-b194-5b38-ad67-93b27aec520c", { "id": "2e1efa8d-b194-5b38-ad67-93b27aec520c", "name": "tuple<major:std::int64, minor:std::int64, stage:std::str, stage_no:std::int64, local:array<std|str>>", "is_abstract": false, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000105", "name": "major" }, { "target_id": "00000000-0000-0000-0000-000000000105", "name": "minor" }, { "target_id": "00000000-0000-0000-0000-000000000101", "name": "stage" }, { "target_id": "00000000-0000-0000-0000-000000000105", "name": "stage_no" }, { "target_id": "bb221d39-09f1-507e-8851-62075bb61823", "name": "local" }], "range_element_id": null, "multirange_element_id": null });
spec.set("48a4615d-2402-5744-bd11-17015ad18bb9", { "id": "48a4615d-2402-5744-bd11-17015ad18bb9", "name": "tuple<major:std::int64, minor:std::int64, stage:sys::VersionStage, stage_no:std::int64, local:array<std|str>>", "is_abstract": false, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000105", "name": "major" }, { "target_id": "00000000-0000-0000-0000-000000000105", "name": "minor" }, { "target_id": "16a08f13-b1b1-57f4-8e82-062f67fb2a4c", "name": "stage" }, { "target_id": "00000000-0000-0000-0000-000000000105", "name": "stage_no" }, { "target_id": "bb221d39-09f1-507e-8851-62075bb61823", "name": "local" }], "range_element_id": null, "multirange_element_id": null });
spec.set("f5e31516-7567-519d-847f-397a0762ce23", { "id": "f5e31516-7567-519d-847f-397a0762ce23", "name": "tuple<name:std::str, expr:std::str>", "is_abstract": false, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000101", "name": "name" }, { "target_id": "00000000-0000-0000-0000-000000000101", "name": "expr" }], "range_element_id": null, "multirange_element_id": null });
spec.set("27d815f4-6518-598a-a3c5-9364342d6e06", { "id": "27d815f4-6518-598a-a3c5-9364342d6e06", "name": "tuple<name:std::str, expr:tuple<text:std|str, refs:array<std||uuid>>>", "is_abstract": false, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000101", "name": "name" }, { "target_id": "67996f7a-c82f-5b58-bb0a-f29764ee45c2", "name": "expr" }], "range_element_id": null, "multirange_element_id": null });
spec.set("c13eb6f1-a05c-533f-bfe8-a50b1a077fd0", { "id": "c13eb6f1-a05c-533f-bfe8-a50b1a077fd0", "name": "tuple<object:anyobject, score:std::float32>", "is_abstract": true, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000003", "name": "object" }, { "target_id": "00000000-0000-0000-0000-000000000106", "name": "score" }], "range_element_id": null, "multirange_element_id": null });
spec.set("e34cf562-ee0c-58d3-a1ee-ff9fbb35bfc3", { "id": "e34cf562-ee0c-58d3-a1ee-ff9fbb35bfc3", "name": "tuple<std::int64, anytype>", "is_abstract": true, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000105", "name": "0" }, { "target_id": "00000000-0000-0000-0000-000000000001", "name": "1" }], "range_element_id": null, "multirange_element_id": null });
spec.set("b20a2c38-2942-5085-88a3-1bbb1eea755f", { "id": "b20a2c38-2942-5085-88a3-1bbb1eea755f", "name": "tuple<std::int64, std::int64>", "is_abstract": false, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000105", "name": "0" }, { "target_id": "00000000-0000-0000-0000-000000000105", "name": "1" }], "range_element_id": null, "multirange_element_id": null });
spec.set("416fe1a6-d62c-5481-80cd-2102a37b3415", { "id": "416fe1a6-d62c-5481-80cd-2102a37b3415", "name": "tuple<std::str, std::json>", "is_abstract": false, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000101", "name": "0" }, { "target_id": "00000000-0000-0000-0000-00000000010f", "name": "1" }], "range_element_id": null, "multirange_element_id": null });
spec.set("67996f7a-c82f-5b58-bb0a-f29764ee45c2", { "id": "67996f7a-c82f-5b58-bb0a-f29764ee45c2", "name": "tuple<text:std::str, refs:array<std|uuid>>", "is_abstract": false, "kind": "tuple", "enum_values": null, "is_seq": false, "material_id": null, "bases": [], "union_of": [], "intersection_of": [], "pointers": [], "exclusives": [], "backlinks": [], "backlink_stubs": [], "array_element_id": null, "tuple_elements": [{ "target_id": "00000000-0000-0000-0000-000000000101", "name": "text" }, { "target_id": "1378c9c3-b11a-5a95-bdac-066a4143094d", "name": "refs" }], "range_element_id": null, "multirange_element_id": null });
spec.set("00000000-0000-0000-0000-0000000001ff", { "id": "00000000-0000-0000-0000-0000000001ff", "name": "std::number", "is_abstract": false, "is_seq": false, "kind": "scalar", "enum_values": null, "material_id": null, "bases": [] });
var complexParamKinds = /* @__PURE__ */ new Set([]);

// src/db/schema/edgeql-js/select.ts
var ASC = "ASC";
var DESC = "DESC";
var EMPTY_FIRST = "EMPTY FIRST";
var EMPTY_LAST = "EMPTY LAST";
function is(expr, shape) {
  const mappedShape = {};
  for (const [key, value] of Object.entries(shape)) {
    if (key === "id") continue;
    mappedShape[key] = {
      __kind__: import_reflection8.ExpressionKind.PolyShapeElement,
      __polyType__: expr,
      __shapeElement__: value
    };
  }
  return mappedShape;
}
function $handleModifiers(modifiers, params2) {
  const { root, scope } = params2;
  const mods = {
    singleton: !!modifiers["filter_single"]
  };
  let card = root.__cardinality__;
  let needsAssertSingle = false;
  if (modifiers.filter) {
    mods.filter = modifiers.filter;
  }
  if (modifiers.filter_single) {
    if (root.__element__.__kind__ !== import_reflection8.TypeKind.object) {
      throw new Error("filter_single can only be used with object types");
    }
    card = import_reflection8.Cardinality.AtMostOne;
    const fs = modifiers.filter_single;
    if (fs.__element__) {
      mods.filter = modifiers.filter_single;
      needsAssertSingle = true;
    } else {
      const exprs = Object.keys(fs).map((key) => {
        const val = fs[key].__element__ ? fs[key] : literal(
          root.__element__["__pointers__"][key]["target"],
          fs[key]
        );
        return $expressionify({
          __element__: {
            __name__: "std::bool",
            __kind__: import_reflection8.TypeKind.scalar
          },
          __cardinality__: import_reflection8.Cardinality.One,
          __kind__: import_reflection8.ExpressionKind.Operator,
          __opkind__: import_reflection8.OperatorKind.Infix,
          __name__: "=",
          __args__: [scope[key], val]
        });
      });
      if (exprs.length === 1) {
        mods.filter = exprs[0];
      } else {
        mods.filter = exprs.reduce((a, b) => {
          return $expressionify({
            __element__: {
              __name__: "std::bool",
              __kind__: import_reflection8.TypeKind.scalar
            },
            __cardinality__: import_reflection8.Cardinality.One,
            __kind__: import_reflection8.ExpressionKind.Operator,
            __opkind__: import_reflection8.OperatorKind.Infix,
            __name__: "and",
            __args__: [a, b]
          });
        });
      }
    }
  }
  if (modifiers.order_by) {
    const orderExprs = Array.isArray(modifiers.order_by) ? modifiers.order_by : [modifiers.order_by];
    mods.order_by = orderExprs.map(
      (expr) => typeof expr.__element__ === "undefined" ? expr : { expression: expr }
    );
  }
  if (modifiers.offset) {
    mods.offset = typeof modifiers.offset === "number" ? $getTypeByName("std::number")(modifiers.offset) : modifiers.offset;
    card = cardutil.overrideLowerBound(card, "Zero");
  }
  if (modifiers.limit) {
    let expr;
    if (typeof modifiers.limit === "number") {
      expr = $getTypeByName("std::number")(modifiers.limit);
    } else {
      const type = modifiers.limit.__element__.__casttype__ ?? modifiers.limit.__element__;
      if (type.__kind__ === import_reflection8.TypeKind.scalar && type.__name__ === "std::number") {
        expr = modifiers.limit;
      } else {
        throw new Error("Invalid value for `limit` modifier");
      }
    }
    mods.limit = expr;
    card = cardutil.overrideLowerBound(card, "Zero");
  }
  return {
    modifiers: mods,
    cardinality: card,
    needsAssertSingle
  };
}
function deleteExpr(expr, modifiersGetter) {
  const selectExpr = select(expr, modifiersGetter);
  return $expressionify({
    __kind__: import_reflection8.ExpressionKind.Delete,
    __element__: selectExpr.__element__,
    __cardinality__: selectExpr.__cardinality__,
    __expr__: selectExpr
  });
}
function $selectify(expr) {
  return expr;
}
var $FreeObject = makeType(
  spec,
  [...spec.values()].find((s) => s.name === "std::FreeObject").id,
  literal
);
var FreeObject = {
  __kind__: import_reflection8.ExpressionKind.PathNode,
  __element__: $FreeObject,
  __cardinality__: import_reflection8.Cardinality.One,
  __parent__: null,
  __exclusive__: true,
  __scopeRoot__: null
};
var $existingScopes = /* @__PURE__ */ new Set();
var shapeSymbol = Symbol("portableShape");
function $shape(_a, b) {
  return b;
}
function select(...args) {
  const firstArg = args[0];
  if (typeof firstArg !== "object" || firstArg instanceof Uint8Array || firstArg instanceof Date || firstArg instanceof import_edgedb2.Duration || firstArg instanceof import_edgedb2.LocalDateTime || firstArg instanceof import_edgedb2.LocalDate || firstArg instanceof import_edgedb2.LocalTime || firstArg instanceof import_edgedb2.RelativeDuration || firstArg instanceof import_edgedb2.DateDuration || firstArg instanceof import_edgedb2.ConfigMemory || firstArg instanceof Float32Array) {
    const literalExpr = literalToTypeSet(firstArg);
    return $expressionify(
      $selectify({
        __kind__: import_reflection8.ExpressionKind.Select,
        __element__: literalExpr.__element__,
        __cardinality__: literalExpr.__cardinality__,
        __expr__: literalExpr,
        __modifiers__: {}
      })
    );
  }
  const exprPair = typeof args[0].__element__ !== "undefined" ? args : [FreeObject, () => args[0]];
  let expr = exprPair[0];
  const shapeGetter = exprPair[1];
  if (expr === FreeObject) {
    const freeObjectPtrs = {};
    for (const [k, v] of Object.entries(args[0])) {
      freeObjectPtrs[k] = {
        __kind__: v.__element__.__kind__ === import_reflection8.TypeKind.object ? "link" : "property",
        target: v.__element__,
        cardinality: v.__cardinality__,
        exclusive: false,
        computed: true,
        readonly: true,
        hasDefault: false,
        properties: {}
      };
    }
    expr = {
      ...FreeObject,
      __element__: {
        ...FreeObject.__element__,
        __pointers__: {
          ...FreeObject.__element__.__pointers__,
          ...freeObjectPtrs
        }
      }
    };
  }
  if (!shapeGetter) {
    if (expr.__element__.__kind__ === import_reflection8.TypeKind.object) {
      const objectExpr = expr;
      return $expressionify(
        $selectify({
          __kind__: import_reflection8.ExpressionKind.Select,
          __element__: {
            __kind__: import_reflection8.TypeKind.object,
            __name__: `${objectExpr.__element__.__name__}`,
            // _shape
            __pointers__: objectExpr.__element__.__pointers__,
            __shape__: objectExpr.__element__.__shape__
          },
          __cardinality__: objectExpr.__cardinality__,
          __expr__: objectExpr,
          __modifiers__: {}
        })
      );
    } else {
      return $expressionify(
        $selectify({
          __kind__: import_reflection8.ExpressionKind.Select,
          __element__: expr.__element__,
          __cardinality__: expr.__cardinality__,
          __expr__: expr,
          __modifiers__: {}
        })
      );
    }
  }
  const cleanScopedExprs = $existingScopes.size === 0;
  const { modifiers: mods, shape, scope } = resolveShape(shapeGetter, expr);
  if (cleanScopedExprs) {
    $existingScopes.clear();
  }
  const { modifiers, cardinality, needsAssertSingle } = $handleModifiers(mods, {
    root: expr,
    scope
  });
  const selectExpr = $selectify({
    __kind__: import_reflection8.ExpressionKind.Select,
    __element__: expr.__element__.__kind__ === import_reflection8.TypeKind.object ? {
      __kind__: import_reflection8.TypeKind.object,
      __name__: `${expr.__element__.__name__}`,
      // _shape
      __pointers__: expr.__element__.__pointers__,
      __shape__: shape
    } : expr.__element__,
    __cardinality__: cardinality,
    __expr__: expr,
    __modifiers__: modifiers,
    __scope__: expr !== scope ? scope : void 0
  });
  return needsAssertSingle ? $assert_single(selectExpr) : $expressionify(selectExpr);
}
function resolveShape(shapeGetter, expr) {
  const modifiers = {};
  const shape = {};
  const scope = expr.__element__.__kind__ === import_reflection8.TypeKind.object ? $getScopedExpr(expr, $existingScopes) : expr;
  const selectShape = typeof shapeGetter === "function" ? shapeGetter(scope) : shapeGetter;
  for (const [key, value] of Object.entries(selectShape)) {
    if (key === "filter" || key === "filter_single" || key === "order_by" || key === "offset" || key === "limit") {
      modifiers[key] = value;
    } else {
      if (expr.__element__.__kind__ !== import_reflection8.TypeKind.object) {
        throw new Error(
          `Invalid select shape key '${key}' on scalar expression, only modifiers are allowed (filter, order_by, offset and limit)`
        );
      }
      shape[key] = resolveShapeElement(key, value, scope);
    }
  }
  return { shape, modifiers, scope };
}
function resolveShapeElement(key, value, scope) {
  const isSubshape = typeof value === "object" && typeof value.__kind__ === "undefined";
  const isClosure = typeof value === "function" && scope.__element__.__pointers__[key]?.__kind__ === "link";
  if (isSubshape || isClosure) {
    const childExpr = scope[key];
    if (!childExpr) {
      throw new Error(
        `Invalid shape element "${key}" for type ${scope.__element__.__name__}`
      );
    }
    const {
      shape: childShape,
      scope: childScope,
      modifiers: mods
    } = resolveShape(value, childExpr);
    const { modifiers, needsAssertSingle } = $handleModifiers(mods, {
      root: childExpr,
      scope: childScope
    });
    const selectExpr = {
      __kind__: import_reflection8.ExpressionKind.Select,
      __element__: {
        __kind__: import_reflection8.TypeKind.object,
        __name__: `${childExpr.__element__.__name__}`,
        __pointers__: childExpr.__element__.__pointers__,
        __shape__: childShape
      },
      __cardinality__: scope.__element__.__pointers__?.[key]?.cardinality || scope.__element__.__shape__?.[key]?.__cardinality__,
      __expr__: childExpr,
      __modifiers__: modifiers,
      __scope__: childExpr !== childScope ? childScope : void 0
    };
    return needsAssertSingle ? $assert_single(selectExpr) : selectExpr;
  } else if (value?.__kind__ === import_reflection8.ExpressionKind.PolyShapeElement) {
    const polyElement = value;
    const polyScope = scope.is(polyElement.__polyType__);
    return {
      __kind__: import_reflection8.ExpressionKind.PolyShapeElement,
      __polyType__: polyScope,
      __shapeElement__: resolveShapeElement(
        key,
        polyElement.__shapeElement__,
        polyScope
      )
    };
  } else if (typeof value === "boolean" && key.startsWith("@")) {
    const linkProp = scope[key];
    if (!linkProp) {
      throw new Error(
        scope.__parent__ ? `link property '${key}' does not exist on link ${scope.__parent__.linkName}` : `cannot select link property '${key}' on an object (${scope.__element__.__name__})`
      );
    }
    return value ? linkProp : false;
  } else {
    return value;
  }
}

// src/db/schema/edgeql-js/query.ts
var runnableExpressionKinds = /* @__PURE__ */ new Set([
  import_reflection9.ExpressionKind.Select,
  import_reflection9.ExpressionKind.Update,
  import_reflection9.ExpressionKind.Insert,
  import_reflection9.ExpressionKind.InsertUnlessConflict,
  import_reflection9.ExpressionKind.Delete,
  import_reflection9.ExpressionKind.Group,
  import_reflection9.ExpressionKind.For,
  import_reflection9.ExpressionKind.With,
  import_reflection9.ExpressionKind.WithParams
]);
var wrappedExprCache = /* @__PURE__ */ new WeakMap();
async function $queryFunc(cxn, args) {
  const expr = runnableExpressionKinds.has(this.__kind__) ? this : wrappedExprCache.get(this) ?? wrappedExprCache.set(this, select(this)).get(this);
  const _args = jsonifyComplexParams(expr, args);
  const query = expr.toEdgeQL();
  if (expr.__cardinality__ === import_reflection9.Cardinality.One || expr.__cardinality__ === import_reflection9.Cardinality.AtMostOne || expr.__cardinality__ === import_reflection9.Cardinality.Empty) {
    return cxn.querySingle(query, _args);
  } else {
    return cxn.query(query, _args);
  }
}
async function $queryFuncJSON(cxn, args) {
  const expr = runnableExpressionKinds.has(this.__kind__) ? this : wrappedExprCache.get(this) ?? wrappedExprCache.set(this, select(this)).get(this);
  const _args = jsonifyComplexParams(expr, args);
  if (expr.__cardinality__ === import_reflection9.Cardinality.One || expr.__cardinality__ === import_reflection9.Cardinality.AtMostOne) {
    return cxn.querySingleJSON(expr.toEdgeQL(), _args);
  } else {
    return cxn.queryJSON(expr.toEdgeQL(), _args);
  }
}

// src/db/schema/edgeql-js/path.ts
function PathLeaf(root, parent, _exclusive, scopeRoot = null) {
  return $expressionify({
    __kind__: import_reflection10.ExpressionKind.PathLeaf,
    __element__: root.__element__,
    __cardinality__: root.__cardinality__,
    __parent__: parent,
    // __exclusive__: exclusive,
    __scopeRoot__: scopeRoot
  });
}
function getStarShapeFromPointers(pointers) {
  const shape = {};
  for (const [key, ptr] of Object.entries(pointers)) {
    if (ptr.__kind__ === "property") {
      shape[key] = true;
    }
  }
  return shape;
}
function PathNode(root, parent, scopeRoot = null) {
  const obj = {
    __kind__: import_reflection10.ExpressionKind.PathNode,
    __element__: root.__element__,
    __cardinality__: root.__cardinality__,
    __parent__: parent,
    // __exclusive__: exclusive,
    __scopeRoot__: scopeRoot
  };
  Object.defineProperty(obj, "*", {
    writable: false,
    value: getStarShapeFromPointers(obj.__element__.__pointers__)
  });
  return $expressionify(obj);
}
var _pathCache = Symbol();
var _pointers = Symbol();
var pathifyProxyHandlers = {
  get(target, prop, proxy) {
    const ptr = target[_pointers][prop];
    if (ptr) {
      return target[_pathCache][prop] ?? (target[_pathCache][prop] = (ptr.__kind__ === "property" ? PathLeaf : PathNode)(
        {
          __element__: ptr.target,
          __cardinality__: cardutil.multiplyCardinalities(
            target.__cardinality__,
            ptr.cardinality
          )
        },
        {
          linkName: prop,
          type: proxy
        },
        ptr.exclusive ?? false,
        target.__scopeRoot__ ?? (scopeRoots.has(proxy) ? proxy : null)
      ));
    }
    return target[prop];
  }
};
function $pathify(_root) {
  if (_root.__element__.__kind__ !== import_reflection10.TypeKind.object) {
    return _root;
  }
  const root = _root;
  let pointers = {
    ...root.__element__.__pointers__
  };
  if (root.__parent__) {
    const { type, linkName } = root.__parent__;
    const parentPointer = type.__element__.__pointers__[linkName];
    if (parentPointer?.__kind__ === "link") {
      pointers = { ...pointers, ...parentPointer.properties };
    }
  }
  for (const [key, val] of Object.entries(
    root.__element__.__shape__ || { id: true }
  )) {
    if (pointers[key]) continue;
    const valType = val?.__element__;
    if (!valType) continue;
    pointers[key] = {
      __kind__: valType.__kind__ === import_reflection10.TypeKind.object ? "link" : "property",
      properties: {},
      target: val.__element__,
      cardinality: val.__cardinality__,
      exclusive: false,
      computed: true,
      readonly: true,
      hasDefault: false
    };
  }
  root[_pointers] = pointers;
  root[_pathCache] = {};
  return new Proxy(root, pathifyProxyHandlers);
}
function isFunc(expr) {
  return $expressionify({
    __kind__: import_reflection10.ExpressionKind.TypeIntersection,
    __cardinality__: this.__cardinality__,
    __element__: {
      ...expr.__element__,
      __shape__: { id: true }
    },
    __expr__: this
  });
}
function $assert_single(expr) {
  return $expressionify({
    __kind__: import_reflection10.ExpressionKind.Function,
    __element__: expr.__element__,
    __cardinality__: cardutil.overrideUpperBound(expr.__cardinality__, "One"),
    __name__: "std::assert_single",
    __args__: [expr],
    __namedargs__: {}
  });
}
var jsonDestructureProxyHandlers = {
  get(target, prop, proxy) {
    if (typeof prop === "string" && !(prop in target)) {
      const parsedProp = Number.isInteger(Number(prop)) ? Number(prop) : prop;
      return jsonDestructure.call(proxy, parsedProp);
    }
    return target[prop];
  }
};
function jsonDestructure(path) {
  const pathTypeSet = literalToTypeSet(path);
  return $expressionify({
    __kind__: import_reflection10.ExpressionKind.Operator,
    __element__: this.__element__,
    __cardinality__: cardutil.multiplyCardinalities(
      this.__cardinality__,
      pathTypeSet.__cardinality__
    ),
    __name__: "[]",
    __opkind__: "Infix",
    __args__: [this, pathTypeSet]
  });
}
function $jsonDestructure(_expr) {
  if (_expr.__element__.__kind__ === import_reflection10.TypeKind.scalar && _expr.__element__.__name__ === "std::json") {
    const expr = new Proxy(_expr, jsonDestructureProxyHandlers);
    expr.destructure = jsonDestructure.bind(expr);
    return expr;
  }
  return _expr;
}
function $expressionify(_expr) {
  const expr = $pathify(
    $jsonDestructure($arrayLikeIndexify($tuplePathify(_expr)))
  );
  expr.run = $queryFunc.bind(expr);
  expr.runJSON = $queryFuncJSON.bind(expr);
  expr.is = isFunc.bind(expr);
  expr.toEdgeQL = $toEdgeQL.bind(expr);
  expr.assert_single = () => $assert_single(expr);
  return Object.freeze(expr);
}
var scopedExprCache = /* @__PURE__ */ new WeakMap();
var scopeRoots = /* @__PURE__ */ new WeakSet();
function $getScopedExpr(expr, existingScopes) {
  let scopedExpr = scopedExprCache.get(expr);
  if (!scopedExpr || existingScopes?.has(scopedExpr)) {
    const isFreeObject = expr.__cardinality__ === import_reflection10.Cardinality.One && expr.__element__.__name__ === "std::FreeObject";
    scopedExpr = isFreeObject ? expr : $expressionify({
      ...expr,
      __cardinality__: import_reflection10.Cardinality.One,
      __scopedFrom__: expr,
      ...expr.__element__.__kind__ === import_reflection10.TypeKind.object ? {
        "*": getStarShapeFromPointers(
          expr.__element__.__pointers__
        )
      } : {}
    });
    scopeRoots.add(scopedExpr);
    const uncached = !scopedExpr;
    if (uncached) {
      scopedExprCache.set(expr, scopedExpr);
    }
  }
  existingScopes?.add(scopedExpr);
  return scopedExpr;
}

// src/db/schema/edgeql-js/literal.ts
var import_reflection11 = require("edgedb/dist/reflection/index");
function literal(type, value) {
  return $expressionify({
    __element__: type,
    __cardinality__: import_reflection11.Cardinality.One,
    __kind__: import_reflection11.ExpressionKind.Literal,
    __value__: value
  });
}
var $nameMapping = new Map([
  ...[...spec.values()].map((type) => [type.name, type.id]),
  ["std::number", "00000000-0000-0000-0000-0000000001ff"]
]);
function $getType(id) {
  return makeType(spec, id, literal);
}
function $getTypeByName(name) {
  return makeType(spec, $nameMapping.get(name), literal);
}

// src/db/schema/edgeql-js/set.ts
var import_reflection12 = require("edgedb/dist/reflection/index");

// src/db/schema/edgeql-js/setImpl.ts
function set(..._exprs) {
  if (_exprs.length === 0) {
    return null;
  }
  const exprs = _exprs.map((expr) => literalToTypeSet(expr));
  return $expressionify({
    __kind__: reflection_exports.ExpressionKind.Set,
    __element__: exprs.map((expr) => expr.__element__).reduce(getSharedParent),
    __cardinality__: cardutil.mergeCardinalitiesVariadic(
      exprs.map((expr) => expr.__cardinality__)
    ),
    __exprs__: exprs
  });
}

// src/db/schema/edgeql-js/set.ts
function getSharedParent(a, b) {
  if (a.__kind__ !== b.__kind__) {
    throw new Error(
      `Incompatible array types: ${a.__name__} and ${b.__name__}`
    );
  }
  if (a.__kind__ === import_reflection12.TypeKind.scalar && b.__kind__ === import_reflection12.TypeKind.scalar) {
    return getSharedParentScalar(a, b);
  } else if (a.__kind__ === import_reflection12.TypeKind.object && b.__kind__ === import_reflection12.TypeKind.object) {
    return $mergeObjectTypes(a, b);
  } else if (a.__kind__ === import_reflection12.TypeKind.tuple && b.__kind__ === import_reflection12.TypeKind.tuple) {
    if (a.__items__.length !== b.__items__.length) {
      throw new Error(
        `Incompatible tuple types: ${a.__name__} and ${b.__name__}`
      );
    }
    try {
      const items = a.__items__.map((_, i) => {
        if (!a.__items__[i] || !b.__items__[i]) {
          throw new Error();
        }
        return getSharedParent(
          a.__items__[i],
          b.__items__[i]
        );
      });
      return {
        __kind__: import_reflection12.TypeKind.tuple,
        __name__: `tuple<${items.map((item) => item.__name__).join(", ")}>`,
        __items__: items
      };
    } catch (_err) {
      throw new Error(
        `Incompatible tuple types: ${a.__name__} and ${b.__name__}`
      );
    }
  } else if (a.__kind__ === import_reflection12.TypeKind.namedtuple && b.__kind__ === import_reflection12.TypeKind.namedtuple) {
    const aKeys = Object.keys(a);
    const bKeys = new Set(Object.keys(b));
    const sameKeys = aKeys.length === bKeys.size && aKeys.every((k) => bKeys.has(k));
    if (!sameKeys) {
      throw new Error(
        `Incompatible tuple types: ${a.__name__} and ${b.__name__}`
      );
    }
    try {
      const items = {};
      for (const [i] of Object.entries(a.__shape__)) {
        if (!a.__shape__[i] || !b.__shape__[i]) {
          throw new Error();
        }
        items[i] = getSharedParent(
          a.__shape__[i],
          b.__shape__[i]
        );
      }
      return {
        __kind__: import_reflection12.TypeKind.namedtuple,
        __name__: `tuple<${Object.entries(items).map(([key, val]) => `${key}: ${val.__name__}`).join(", ")}>`,
        __shape__: items
      };
    } catch (_err) {
      throw new Error(
        `Incompatible tuple types: ${a.__name__} and ${b.__name__}`
      );
    }
  } else if (a.__kind__ === import_reflection12.TypeKind.array && b.__kind__ === import_reflection12.TypeKind.array) {
    try {
      const mergedEl = getSharedParent(
        a.__element__,
        b.__element__
      );
      return {
        __kind__: import_reflection12.TypeKind.array,
        __name__: a.__name__,
        __element__: mergedEl
      };
    } catch (_err) {
      throw new Error(
        `Incompatible array types: ${a.__name__} and ${b.__name__}`
      );
    }
  } else if (a.__kind__ === import_reflection12.TypeKind.enum && b.__kind__ === import_reflection12.TypeKind.enum) {
    if (a.__name__ === b.__name__) return a;
    throw new Error(
      `Incompatible array types: ${a.__name__} and ${b.__name__}`
    );
  } else {
    throw new Error(
      `Incompatible array types: ${a.__name__} and ${b.__name__}`
    );
  }
}

// src/db/schema/edgeql-js/cast.ts
var import_reflection13 = require("edgedb/dist/reflection/index");
function cast(target, expr) {
  const cleanedExpr = expr === null ? null : literalToTypeSet(expr);
  return $expressionify({
    __element__: target.__cardinality__ ? target.__element__ : target,
    __cardinality__: cleanedExpr === null ? import_reflection13.Cardinality.Empty : cleanedExpr.__cardinality__,
    __expr__: cleanedExpr,
    __kind__: import_reflection13.ExpressionKind.Cast
  });
}

// src/db/schema/edgeql-js/update.ts
var import_reflection15 = require("edgedb/dist/reflection/index");

// src/db/schema/edgeql-js/insert.ts
var import_reflection14 = require("edgedb/dist/reflection/index");
function unlessConflict(conflictGetter) {
  const expr = {
    __kind__: import_reflection14.ExpressionKind.InsertUnlessConflict,
    __element__: this.__element__,
    __cardinality__: import_reflection14.Cardinality.AtMostOne,
    __expr__: this
    // __conflict__: Conflict;
  };
  if (!conflictGetter) {
    expr.__conflict__ = { on: null };
    return $expressionify(expr);
  } else {
    const scopedExpr = $getScopedExpr(this.__expr__);
    const conflict = conflictGetter(scopedExpr);
    expr.__conflict__ = conflict;
    if (conflict.else) {
      expr.__cardinality__ = conflict.else.__cardinality__;
      if (this.__element__.__name__ !== conflict.else.__element__.__name__) {
        expr.__element__ = $getTypeByName("std::Object");
      }
    }
    return $expressionify(expr);
  }
}
function $insertify(expr) {
  expr.unlessConflict = unlessConflict.bind(expr);
  return expr;
}
function $normaliseInsertShape(root, shape, isUpdate = false) {
  const newShape = {};
  const _shape = shape.__element__?.__kind__ === import_reflection14.TypeKind.namedtuple ? Object.keys(shape.__element__.__shape__).map(
    (key) => [key, shape[key]]
  ) : Object.entries(shape);
  for (const [key, _val] of _shape) {
    let val = _val;
    let setModify = null;
    if (isUpdate && _val != null && typeof _val === "object") {
      const valKeys = Object.keys(_val);
      if (valKeys.length === 1 && (valKeys[0] === "+=" || valKeys[0] === "-=")) {
        val = _val[valKeys[0]];
        setModify = valKeys[0];
      }
    }
    const pointer = root.__element__.__pointers__[key];
    const isLinkProp = key[0] === "@";
    if (!pointer && !isLinkProp) {
      throw new Error(
        `Could not find property pointer for ${isUpdate ? "update" : "insert"} shape key: '${key}'`
      );
    }
    if (val === void 0) continue;
    if (val?.__kind__) {
      if (val.__kind__ === import_reflection14.ExpressionKind.Literal && val.__element__.__kind__ === import_reflection14.TypeKind.range && val.__element__.__element__.__name__ === "std::number") {
        newShape[key] = literal(pointer?.target, val.__value__);
      } else {
        newShape[key] = _val;
      }
      continue;
    }
    if (isLinkProp) {
      throw new Error(
        `Cannot assign plain data to link property '${key}'. Provide an expression instead.`
      );
    }
    if (!pointer) {
      throw new Error(
        "Code will never reach here, but TypeScript cannot determine"
      );
    }
    if (pointer.__kind__ !== "property" && val !== null) {
      throw new Error(
        `Must provide subquery when assigning to link '${key}' in ${isUpdate ? "update" : "insert"} query.`
      );
    }
    const isMulti = pointer.cardinality === import_reflection14.Cardinality.AtLeastOne || pointer.cardinality === import_reflection14.Cardinality.Many;
    const wrappedVal = val === null ? cast(pointer.target, null) : isMulti && Array.isArray(val) ? val.length === 0 ? cast(pointer.target, null) : set(...val.map((v) => literal(pointer.target, v))) : literal(pointer.target, val);
    newShape[key] = setModify ? { [setModify]: wrappedVal } : wrappedVal;
  }
  return newShape;
}
function insert(root, shape) {
  if (typeof shape !== "object") {
    throw new Error(
      `invalid insert shape.${typeof shape === "function" ? " Hint: Insert shape is expected to be an object, not a function returning a shape object." : ""}`
    );
  }
  const expr = {
    __kind__: import_reflection14.ExpressionKind.Insert,
    __element__: root.__element__,
    __cardinality__: import_reflection14.Cardinality.One,
    __expr__: root,
    __shape__: $normaliseInsertShape(root, shape)
  };
  expr.unlessConflict = unlessConflict.bind(expr);
  return $expressionify($insertify(expr));
}

// src/db/schema/edgeql-js/update.ts
function update(expr, shape) {
  const cleanScopedExprs = $existingScopes.size === 0;
  const scope = $getScopedExpr(expr, $existingScopes);
  const resolvedShape = shape(scope);
  if (cleanScopedExprs) {
    $existingScopes.clear();
  }
  const mods = {};
  let updateShape;
  for (const [key, val] of Object.entries(resolvedShape)) {
    if (key === "filter" || key === "filter_single") {
      mods[key] = val;
    } else if (key === "set") {
      updateShape = val;
    } else {
      throw new Error(
        `Invalid update shape key '${key}', only 'filter', 'filter_single', and 'set' are allowed`
      );
    }
  }
  if (!updateShape) {
    throw new Error(`Update shape must contain 'set' shape`);
  }
  const { modifiers, cardinality, needsAssertSingle } = $handleModifiers(mods, {
    root: expr,
    scope
  });
  const updateExpr = {
    __kind__: import_reflection15.ExpressionKind.Update,
    __element__: expr.__element__,
    __cardinality__: cardinality,
    __expr__: expr,
    __shape__: $normaliseInsertShape(expr, updateShape, true),
    __modifiers__: modifiers,
    __scope__: scope
  };
  return needsAssertSingle ? $assert_single(updateExpr) : $expressionify(updateExpr);
}

// src/db/schema/edgeql-js/for.ts
var import_reflection16 = require("edgedb/dist/reflection/index");
function _for(set3, expr) {
  const forVar = $expressionify({
    __kind__: import_reflection16.ExpressionKind.ForVar,
    __element__: set3.__element__,
    __cardinality__: import_reflection16.Cardinality.One
  });
  const returnExpr = expr(forVar);
  return $expressionify({
    __kind__: import_reflection16.ExpressionKind.For,
    __element__: returnExpr.__element__,
    __cardinality__: cardutil.multiplyCardinalities(
      set3.__cardinality__,
      returnExpr.__cardinality__
    ),
    __iterSet__: set3,
    __expr__: returnExpr,
    __forVar__: forVar
  });
}

// src/db/schema/edgeql-js/with.ts
var import_reflection17 = require("edgedb/dist/reflection/index");
function alias(expr) {
  return $expressionify({
    __kind__: import_reflection17.ExpressionKind.Alias,
    __element__: expr.__element__,
    __cardinality__: expr.__cardinality__,
    __expr__: expr
  });
}
function _with(refs, expr) {
  return $expressionify({
    __kind__: import_reflection17.ExpressionKind.With,
    __element__: expr.__element__,
    __cardinality__: expr.__cardinality__,
    __refs__: refs,
    __expr__: expr
  });
}

// src/db/schema/edgeql-js/params.ts
var import_reflection18 = require("edgedb/dist/reflection/index");
function optional(type) {
  return {
    __kind__: import_reflection18.ExpressionKind.OptionalParam,
    __type__: type
  };
}
function params(paramsDef, expr) {
  const paramExprs = {};
  for (const [key, param] of Object.entries(paramsDef)) {
    const paramType = param.__kind__ === import_reflection18.ExpressionKind.OptionalParam ? param.__type__ : param;
    const isComplex = complexParamKinds.has(paramType.__kind__) || paramType.__kind__ === import_reflection18.TypeKind.array && complexParamKinds.has(paramType.__element__.__kind__);
    paramExprs[key] = $expressionify({
      __kind__: import_reflection18.ExpressionKind.Param,
      __element__: paramType,
      __cardinality__: param.__kind__ === import_reflection18.ExpressionKind.OptionalParam ? import_reflection18.Cardinality.AtMostOne : import_reflection18.Cardinality.One,
      __name__: key,
      __isComplex__: isComplex
    });
  }
  let returnExpr = expr(paramExprs);
  if (!runnableExpressionKinds.has(returnExpr.__kind__)) {
    returnExpr = select(returnExpr);
  }
  return $expressionify({
    __kind__: import_reflection18.ExpressionKind.WithParams,
    __element__: returnExpr.__element__,
    __cardinality__: returnExpr.__cardinality__,
    __expr__: returnExpr,
    __params__: Object.values(paramExprs)
  });
}

// src/db/schema/edgeql-js/detached.ts
var import_reflection19 = require("edgedb/dist/reflection/index");
function detached(expr) {
  return $expressionify({
    __element__: expr.__element__,
    __cardinality__: expr.__cardinality__,
    __expr__: expr,
    __kind__: import_reflection19.ExpressionKind.Detached
  });
}

// src/db/schema/edgeql-js/index.ts
var import_edgedb4 = require("edgedb");

// src/db/schema/edgeql-js/syntax.ts
var syntax_exports = {};
__export(syntax_exports, {
  $PathLeaf: () => PathLeaf,
  $PathNode: () => PathNode,
  $arrayLikeIndexify: () => $arrayLikeIndexify,
  $assert_single: () => $assert_single,
  $existingScopes: () => $existingScopes,
  $expressionify: () => $expressionify,
  $getScopedExpr: () => $getScopedExpr,
  $getType: () => $getType,
  $getTypeByName: () => $getTypeByName,
  $handleModifiers: () => $handleModifiers,
  $insertify: () => $insertify,
  $jsonDestructure: () => $jsonDestructure,
  $nameMapping: () => $nameMapping,
  $normaliseInsertShape: () => $normaliseInsertShape,
  $objectTypeToTupleType: () => $objectTypeToTupleType,
  $pathify: () => $pathify,
  $range: () => range,
  $resolveOverload: () => $resolveOverload,
  $selectify: () => $selectify,
  $toEdgeQL: () => $toEdgeQL,
  $tuplePathify: () => $tuplePathify,
  ASC: () => ASC,
  DESC: () => DESC,
  EMPTY_FIRST: () => EMPTY_FIRST,
  EMPTY_LAST: () => EMPTY_LAST,
  alias: () => alias,
  array: () => array,
  cast: () => cast,
  delete: () => deleteExpr,
  detached: () => detached,
  for: () => _for,
  getSharedParent: () => getSharedParent,
  group: () => group,
  insert: () => insert,
  is: () => is,
  isGroupingSet: () => isGroupingSet2,
  literal: () => literal,
  makeGlobal: () => makeGlobal,
  optional: () => optional,
  params: () => params,
  resolveShapeElement: () => resolveShapeElement,
  select: () => select,
  set: () => set,
  shape: () => $shape,
  tuple: () => tuple,
  update: () => update,
  with: () => _with
});

// src/db/schema/edgeql-js/group.ts
var import_reflection20 = require("edgedb/dist/reflection/index");
function isGroupingSet2(arg) {
  return arg.__kind__ === "groupingset";
}
var makeGroupingSet = (prefix) => (grps) => {
  const seenKeys = /* @__PURE__ */ new Map();
  const unfiltered = Object.entries(grps).flatMap(
    ([k, grp]) => isGroupingSet2(grp) ? grp.__exprs__ : [[k, grp]]
  );
  const filtered = unfiltered.filter(([k, expr]) => {
    if (!seenKeys.has(k)) {
      seenKeys.set(k, expr);
      return true;
    }
    if (expr !== seenKeys.get(k)) {
      throw new Error(
        `Cannot override pre-existing expression with key "${k}"`
      );
    }
    return false;
  });
  return {
    [`${Math.round(1e6 * Math.random())}___`]: {
      __kind__: "groupingset",
      __settype__: prefix,
      __elements__: grps,
      __exprs__: filtered
    }
  };
};
var set2 = makeGroupingSet("set");
var tuple2 = makeGroupingSet("tuple");
var rollup = makeGroupingSet("rollup");
var cube = makeGroupingSet("cube");
var setFuncs = { set: set2, tuple: tuple2, rollup, cube };
var groupFunc = (expr, getter) => {
  const { shape, scope, modifiers } = resolveShape2(getter, expr);
  const groupSet = tuple2(modifiers.by);
  const key = Object.keys(groupSet)[0];
  const grouping = groupSet[key];
  const keyShape = {};
  const keyPointers = {};
  const keyShapeElement = {};
  for (const [k, e] of grouping.__exprs__) {
    keyShape[k] = $expressionify({
      __element__: e.__element__,
      __cardinality__: import_reflection20.Cardinality.AtMostOne
    });
    keyPointers[k] = {
      __kind__: "property",
      target: e.__element__,
      cardinality: import_reflection20.Cardinality.AtMostOne,
      exclusive: false,
      computed: false,
      readonly: false,
      hasDefault: false
    };
    keyShapeElement[k] = true;
  }
  const $FreeObject3 = makeType(
    spec,
    [...spec.values()].find((s) => s.name === "std::FreeObject").id,
    literal
  );
  const str2 = makeType(
    spec,
    [...spec.values()].find((s) => s.name === "std::str").id,
    literal
  );
  return $expressionify({
    __element__: {
      ...$FreeObject3,
      __name__: "std::FreeObject",
      __pointers__: {
        ...$FreeObject3.__pointers__,
        __name__: "std::FreeObject",
        grouping: {
          __kind__: "property",
          target: str2,
          cardinality: import_reflection20.Cardinality.Many,
          exclusive: false,
          computed: false,
          readonly: false,
          hasDefault: false
        },
        key: {
          __kind__: "link",
          target: {
            ...$FreeObject3,
            __name__: "std::FreeObject",
            __pointers__: {
              ...$FreeObject3.__pointers__,
              ...keyPointers
            },
            __shape__: keyShape
          },
          properties: {},
          cardinality: import_reflection20.Cardinality.One,
          exclusive: false,
          computed: false,
          readonly: false,
          hasDefault: false
        },
        elements: {
          __kind__: "link",
          target: expr.__element__,
          cardinality: import_reflection20.Cardinality.Many,
          properties: {},
          exclusive: false,
          computed: false,
          readonly: false,
          hasDefault: false
        }
      },
      __shape__: {
        grouping: $expressionify({
          __element__: str2,
          __cardinality__: import_reflection20.Cardinality.Many
        }),
        key: $expressionify({
          __element__: {
            ...$FreeObject3,
            __shape__: keyShape
          },
          __cardinality__: import_reflection20.Cardinality.One
        }),
        elements: $expressionify({
          __element__: { ...expr.__element__, __shape__: shape },
          __cardinality__: import_reflection20.Cardinality.Many
        })
      }
    },
    __cardinality__: import_reflection20.Cardinality.Many,
    __expr__: expr,
    __modifiers__: { by: grouping },
    __kind__: import_reflection20.ExpressionKind.Group,
    __scope__: scope
  });
};
Object.assign(groupFunc, setFuncs);
function resolveShape2(shapeGetter, expr) {
  const modifiers = {};
  const shape = {};
  const scope = $getScopedExpr(expr);
  const selectShape = typeof shapeGetter === "function" ? shapeGetter(scope) : shapeGetter;
  for (const [key, value] of Object.entries(selectShape)) {
    if (key === "by") {
      modifiers[key] = value;
    } else {
      if (expr.__element__.__kind__ !== import_reflection20.TypeKind.object) {
        throw new Error(
          `Invalid select shape key '${key}' on scalar expression, only modifiers are allowed (filter, order_by, offset and limit)`
        );
      }
      shape[key] = resolveShapeElement(key, value, scope);
    }
  }
  if (Object.keys(shape).length === 0) {
    shape.id = true;
  }
  if (!modifiers.by) {
    throw new Error("Must provide a `by` key in `e.group`");
  }
  return { shape, modifiers, scope };
}
var group = groupFunc;

// src/db/schema/edgeql-js/funcops.ts
var import_reflection21 = require("edgedb/dist/reflection/index");
function mapLiteralToTypeSet(literals) {
  if (Array.isArray(literals)) {
    return literals.map((lit) => lit != null ? literalToTypeSet(lit) : lit);
  }
  const obj = {};
  for (const key of Object.keys(literals)) {
    obj[key] = literals[key] != null ? literalToTypeSet(literals[key]) : literals[key];
  }
  return obj;
}
function $resolveOverload(funcName, args, typeSpec, funcDefs) {
  const positionalArgs = [];
  let namedArgs;
  if (args.length) {
    if (args[0] !== void 0) {
      try {
        positionalArgs.push(literalToTypeSet(args[0]));
      } catch {
        namedArgs = mapLiteralToTypeSet(args[0]);
      }
    } else {
      positionalArgs.push(void 0);
    }
    positionalArgs.push(...mapLiteralToTypeSet(args.slice(1)));
  }
  for (const def of funcDefs) {
    const resolvedOverload = _tryOverload(
      funcName,
      positionalArgs,
      namedArgs,
      typeSpec,
      def
    );
    if (resolvedOverload !== null) {
      return resolvedOverload;
    }
  }
  throw new Error(
    `No function overload found for ${funcName.includes("::") ? `'e.${funcName.split("::").join(".")}()'` : `operator '${funcName}'`} with args: ${[...positionalArgs, ...Object.values(namedArgs ?? {})].filter(Boolean).map(
      (arg) => `Element: ${arg.__element__.__name__} (${arg.__cardinality__})`
    ).join(", ")}`
  );
}
var ANYTYPE_ARG = Symbol();
function _tryOverload(funcName, args, namedArgs, typeSpec, funcDef) {
  if (funcDef.namedArgs === void 0 && namedArgs !== void 0 || namedArgs === void 0 && funcDef.namedArgs && Object.values(funcDef.namedArgs).some((arg) => !arg.optional)) {
    return null;
  }
  const lastParamVariadic = funcDef.args[funcDef.args.length - 1]?.variadic;
  if (!lastParamVariadic && args.length > funcDef.args.length) {
    return null;
  }
  const paramCardinalities = [import_reflection21.Cardinality.One];
  if (namedArgs) {
    for (const [key, value] of Object.entries(namedArgs)) {
      const argDef = funcDef.namedArgs?.[key];
      if (!argDef || !compareType(typeSpec, argDef.typeId, value.__element__).match) {
        return null;
      }
      paramCardinalities.push(
        argDef.setoftype ? funcDef.preservesOptionality ? cardutil.overrideUpperBound(value.__cardinality__, "One") : import_reflection21.Cardinality.One : argDef.optional ? cardutil.overrideLowerBound(value.__cardinality__, "One") : value.__cardinality__
      );
    }
  }
  let positionalArgs = [];
  let returnAnytype;
  let needsAnytypeReplacement = false;
  for (let i = 0; i < funcDef.args.length; i++) {
    const argDef = funcDef.args[i];
    const arg = args[i];
    if (arg === void 0) {
      if (!argDef.optional) {
        return null;
      }
      if (i < args.length) {
        const argTypeName = typeSpec.get(argDef.typeId).name;
        if (argTypeName.includes("anytype") || argTypeName.includes("std::anypoint")) {
          if (!returnAnytype) {
            positionalArgs.push(ANYTYPE_ARG);
            needsAnytypeReplacement = true;
          } else {
            positionalArgs.push(cast(returnAnytype, null));
          }
        } else {
          const argType = makeType(typeSpec, argDef.typeId, literal);
          positionalArgs.push(cast(argType, null));
        }
      }
    } else {
      const { match, anytype } = compareType(
        typeSpec,
        argDef.typeId,
        arg.__element__
      );
      if (!match) {
        return null;
      }
      if (!returnAnytype && anytype) {
        returnAnytype = anytype;
      }
      positionalArgs.push(
        ...argDef.variadic ? args.slice(i) : [arg]
      );
      if (argDef.setoftype) {
        paramCardinalities.push(
          funcDef.preservesOptionality ? cardutil.overrideUpperBound(arg.__cardinality__, "One") : import_reflection21.Cardinality.One
        );
      } else {
        const card = argDef.variadic ? cardutil.multiplyCardinalitiesVariadic(
          args.slice(i).map(
            (el) => el.__cardinality__
          )
        ) : arg.__cardinality__;
        paramCardinalities.push(
          argDef.optional ? cardutil.overrideLowerBound(card, "One") : card
        );
      }
    }
  }
  let cardinality;
  if (funcName === "if_else") {
    cardinality = cardutil.multiplyCardinalities(
      cardutil.orCardinalities(
        positionalArgs[0].__cardinality__,
        positionalArgs[2].__cardinality__
      ),
      positionalArgs[1].__cardinality__
    );
  } else if (funcName === "std::assert_exists") {
    cardinality = cardutil.overrideLowerBound(
      positionalArgs[0].__cardinality__,
      "One"
    );
  } else if (funcName === "union") {
    cardinality = cardutil.mergeCardinalities(
      positionalArgs[0].__cardinality__,
      positionalArgs[1].__cardinality__
    );
  } else if (funcName === "??") {
    cardinality = cardutil.coalesceCardinalities(
      positionalArgs[0].__cardinality__,
      positionalArgs[1].__cardinality__
    );
  } else if (funcName === "distinct") {
    cardinality = positionalArgs[0].__cardinality__;
  } else {
    cardinality = funcDef.returnTypemod === "SetOfType" ? import_reflection21.Cardinality.Many : cardutil.multiplyCardinalitiesVariadic(paramCardinalities);
    if (funcDef.returnTypemod === "OptionalType" && !funcDef.preservesOptionality) {
      cardinality = cardutil.overrideLowerBound(cardinality, "Zero");
    }
  }
  if (needsAnytypeReplacement) {
    if (!returnAnytype) {
      throw new Error(`could not resolve anytype for ${funcName}`);
    }
    positionalArgs = positionalArgs.map(
      (arg) => arg === ANYTYPE_ARG ? cast(returnAnytype, null) : arg
    );
  }
  return {
    kind: funcDef.kind,
    returnType: makeType(
      typeSpec,
      funcDef.returnTypeId,
      literal,
      returnAnytype
    ),
    cardinality,
    args: positionalArgs,
    namedArgs: namedArgs ?? {}
  };
}
var nameRemapping = {
  "std::int16": "std::number",
  "std::int32": "std::number",
  "std::int64": "std::number",
  "std::float32": "std::number",
  "std::float64": "std::number"
};
var descendantCache = /* @__PURE__ */ new Map();
function getDescendantNames(typeSpec, typeId) {
  if (descendantCache.has(typeId)) {
    return descendantCache.get(typeId);
  }
  const descendants = [
    ...new Set(
      [...typeSpec.values()].filter(
        (type) => type.kind === "scalar" && type.bases.some(({ id }) => id === typeId)
      ).flatMap(
        (type) => type.is_abstract ? getDescendantNames(typeSpec, type.id) : [nameRemapping[type.name], type.name]
      )
    )
  ];
  descendantCache.set(typeId, descendants);
  return descendants;
}
function compareType(typeSpec, typeId, arg) {
  const type = typeSpec.get(typeId);
  if (type.name === "anytype") {
    return { match: true, anytype: arg };
  }
  if (type.name === "anyobject") {
    return { match: arg.__kind__ === import_reflection21.TypeKind.object, anytype: arg };
  }
  if (type.name === "std::anypoint") {
    const descendants = getDescendantNames(typeSpec, typeId);
    if (descendants.includes(arg.__name__)) {
      return { match: true, anytype: arg };
    }
  }
  if (type.name === "std::anyenum") {
    return { match: arg.__kind__ === import_reflection21.TypeKind.enum };
  }
  if (type.kind === "scalar") {
    arg = arg.__casttype__ ?? arg;
    return {
      match: (arg.__kind__ === import_reflection21.TypeKind.scalar || arg.__kind__ === import_reflection21.TypeKind.enum) && (arg.__name__ === type.name || isImplicitlyCastableTo(arg.__name__, type.name))
    };
  }
  if (type.kind === "array") {
    if (arg.__kind__ === import_reflection21.TypeKind.array) {
      return compareType(
        typeSpec,
        type.array_element_id,
        arg.__element__
      );
    }
  }
  if (type.kind === "range") {
    if (arg.__kind__ === import_reflection21.TypeKind.range) {
      return compareType(
        typeSpec,
        type.range_element_id,
        arg.__element__
      );
    }
  }
  if (type.kind === "multirange") {
    if (arg.__kind__ === import_reflection21.TypeKind.multirange) {
      return compareType(
        typeSpec,
        type.multirange_element_id,
        arg.__element__
      );
    }
  }
  if (type.kind === "object") {
    if (arg.__kind__ !== import_reflection21.TypeKind.object) return { match: false };
    const objectArg = arg;
    let match = true;
    for (const ptr of type.pointers) {
      if (objectArg.__pointers__[ptr.name]) {
        const argPtr = objectArg.__pointers__[ptr.name];
        const ptrTarget = typeSpec.get(ptr.target_id);
        if (ptrTarget.name !== argPtr.target.__name__ || ptr.card !== argPtr.cardinality) {
          match = false;
        }
      }
    }
    return {
      match
    };
  }
  if (type.kind === "tuple") {
    const items = arg.__kind__ === import_reflection21.TypeKind.tuple ? arg.__items__ : arg.__kind__ === import_reflection21.TypeKind.namedtuple ? arg.__shape__ : null;
    if (items) {
      const keys = Object.keys(items);
      if (keys.length === type.tuple_elements.length) {
        let anytype;
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== type.tuple_elements[i].name) {
            return { match: false };
          }
          const { match: m, anytype: a } = compareType(
            typeSpec,
            type.tuple_elements[i].target_id,
            items[keys[i]]
          );
          if (!m) {
            return { match: false };
          }
          if (a) anytype = a;
        }
        return { match: true, anytype };
      }
    }
  }
  return { match: false };
}

// src/db/schema/edgeql-js/globals.ts
var import_reflection22 = require("edgedb/dist/reflection/index");
function makeGlobal(name, type, card) {
  return $expressionify({
    __name__: name,
    __element__: type,
    __cardinality__: card,
    __kind__: import_reflection22.ExpressionKind.Global
  });
}

// src/db/schema/edgeql-js/range.ts
var import_edgedb3 = require("edgedb");
var import_reflection23 = require("edgedb/dist/reflection/index");
function range(...args) {
  if (args.length === 1) {
    const arg = args[0];
    if (arg instanceof import_edgedb3.Range) {
      if (arg.lower === null && arg.upper === null) {
        throw new Error(
          `Can't create literal expression from unbounded range. Try this instead:

  e.range(e.cast(e.int64, e.set()), e.cast(e.int64, e.set()))`
        );
      }
      if (arg.isEmpty) {
        throw new Error(`Can't create literal expression from empty range.`);
      }
      return literal(
        range(literalToTypeSet(arg.lower ?? arg.upper).__element__),
        arg
      );
    }
    if (arg.__kind__ && !arg.__element__) {
      return {
        __kind__: import_reflection23.TypeKind.range,
        __name__: `range<${arg.__name__}>`,
        __element__: arg
      };
    }
  }
  const {
    returnType,
    cardinality,
    args: positionalArgs,
    namedArgs
  } = $resolveOverload("std::range", args, spec, [
    {
      args: [
        {
          typeId: $nameMapping.get("std::anypoint"),
          optional: true,
          setoftype: false,
          variadic: false
        },
        {
          typeId: $nameMapping.get("std::anypoint"),
          optional: true,
          setoftype: false,
          variadic: false
        }
      ],
      namedArgs: {
        inc_lower: {
          typeId: $nameMapping.get("std::bool"),
          optional: true,
          setoftype: false,
          variadic: false
        },
        inc_upper: {
          typeId: $nameMapping.get("std::bool"),
          optional: true,
          setoftype: false,
          variadic: false
        },
        empty: {
          typeId: $nameMapping.get("std::bool"),
          optional: true,
          setoftype: false,
          variadic: false
        }
      },
      returnTypeId: $nameMapping.get("range<std::anypoint>")
    }
  ]);
  return $expressionify({
    __kind__: import_reflection23.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::range",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}

// src/db/schema/edgeql-js/operators.ts
var operators_exports = {};
__export(operators_exports, {
  op: () => op
});

// src/db/schema/edgeql-js/imports.ts
var edgedb3 = __toESM(require("edgedb"));

// src/db/schema/edgeql-js/operators.ts
var overloadDefs = {
  Infix: {
    "=": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "?=": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: true, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: true, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: true, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: true, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: true, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: true, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: true, setoftype: false, variadic: false }, { typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "!=": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "?!=": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: true, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: true, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: true, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: true, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: true, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: true, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: true, setoftype: false, variadic: false }, { typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    ">=": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    ">": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "<=": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "<": [
      { kind: "Infix", args: [{ typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }, { typeId: "a64cb492-91a2-5ee0-890a-6caeb3e32aa5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000002", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }, { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }, { typeId: "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000130", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "15315dad-c4ad-5335-97d6-4612e66ffb71", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "or": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "and": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "+": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010e" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "c3231f27-c8a1-5a0c-9830-c71206020eac" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000112" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" }
    ],
    "-": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010e" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010e" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "c3231f27-c8a1-5a0c-9830-c71206020eac" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000112" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000112" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" }
    ],
    "*": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
      { kind: "Infix", args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2" },
      { kind: "Infix", args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "c3231f27-c8a1-5a0c-9830-c71206020eac" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
    ],
    "/": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
    ],
    "//": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
    ],
    "%": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
    ],
    "^": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
    ],
    "in": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "not in": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "union": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
    ],
    "except": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
    ],
    "intersect": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
    ],
    "??": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: true, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
    ],
    "++": [
      { kind: "Infix", args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000102" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010f" }
    ],
    "like": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "ilike": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "not like": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "not ilike": [
      { kind: "Infix", args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ]
  },
  Postfix: {},
  Prefix: {
    "not": [
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "+": [
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
    ],
    "-": [
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010e" },
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" },
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" }
    ],
    "exists": [
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
    ],
    "distinct": [
      { kind: "Prefix", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
    ]
  },
  Ternary: {
    "if_else": [
      { kind: "Ternary", args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
    ]
  }
};
function op(...args) {
  let op2 = "";
  let params2 = [];
  let defs = null;
  if (args.length === 2) {
    if (typeof args[0] === "string" && overloadDefs.Prefix[args[0]]) {
      op2 = args[0];
      params2 = [args[1]];
      defs = overloadDefs.Prefix[op2];
    } else if (typeof args[1] === "string" && overloadDefs.Postfix[args[1]]) {
      op2 = args[1];
      params2 = [args[0]];
      defs = overloadDefs.Postfix[op2];
    }
  } else if (args.length === 3) {
    if (typeof args[1] === "string") {
      op2 = args[1];
      params2 = [args[0], args[2]];
      defs = overloadDefs.Infix[op2];
    }
  } else if (args.length === 5) {
    if (typeof args[1] === "string" && typeof args[3] === "string") {
      op2 = `${args[1]}_${args[3]}`;
      params2 = [args[0], args[2], args[4]];
      defs = overloadDefs.Ternary[op2];
    }
  } else if (args.length === 6) {
    if (typeof args[0] === "string" && typeof args[2] === "string" && typeof args[4] === "string") {
      op2 = `${args[0]}_${args[4]}`;
      params2 = [args[3], args[1], args[5]];
      defs = overloadDefs.Ternary[op2];
    }
  }
  if (!defs) {
    throw new Error(`No operator exists with signature: ${args.map((arg) => `${arg}`).join(", ")}`);
  }
  const { kind, returnType, cardinality, args: resolvedArgs } = syntax_exports.$resolveOverload(op2, params2, spec, defs);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Operator,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: op2,
    __opkind__: kind,
    __args__: resolvedArgs
  });
}

// src/db/schema/edgeql-js/modules/std/enc.ts
var Base64Alphabet = makeType(spec, "5ca96424-93ba-560a-994b-7820c9623e3d", syntax_exports.literal);
function base64_encode(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::enc::base64_encode", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], namedArgs: { "alphabet": { typeId: "5ca96424-93ba-560a-994b-7820c9623e3d", optional: true, setoftype: false, variadic: false }, "padding": { typeId: "00000000-0000-0000-0000-000000000109", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::enc::base64_encode",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function base64_decode(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::enc::base64_decode", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], namedArgs: { "alphabet": { typeId: "5ca96424-93ba-560a-994b-7820c9623e3d", optional: true, setoftype: false, variadic: false }, "padding": { typeId: "00000000-0000-0000-0000-000000000109", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000102" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::enc::base64_decode",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var __defaultExports = {
  "Base64Alphabet": Base64Alphabet,
  "base64_encode": base64_encode,
  "base64_decode": base64_decode
};
var enc_default = __defaultExports;

// src/db/schema/edgeql-js/modules/std.ts
var Endian = makeType(spec, "e4a1d11b-227e-5744-a0c9-31f9cd756e7b", syntax_exports.literal);
var JsonEmpty = makeType(spec, "584feb89-c83d-561d-aa78-24e6d779f044", syntax_exports.literal);
var bigint = makeType(spec, "00000000-0000-0000-0000-000000000110", syntax_exports.literal);
var bool = makeType(spec, "00000000-0000-0000-0000-000000000109", syntax_exports.literal);
var bytes = makeType(spec, "00000000-0000-0000-0000-000000000102", syntax_exports.literal);
var datetime = makeType(spec, "00000000-0000-0000-0000-00000000010a", syntax_exports.literal);
var decimal = makeType(spec, "00000000-0000-0000-0000-000000000108", syntax_exports.literal);
var duration = makeType(spec, "00000000-0000-0000-0000-00000000010e", syntax_exports.literal);
var float32 = makeType(spec, "00000000-0000-0000-0000-000000000106", syntax_exports.literal);
var float64 = makeType(spec, "00000000-0000-0000-0000-000000000107", syntax_exports.literal);
var int16 = makeType(spec, "00000000-0000-0000-0000-000000000103", syntax_exports.literal);
var int32 = makeType(spec, "00000000-0000-0000-0000-000000000104", syntax_exports.literal);
var int64 = makeType(spec, "00000000-0000-0000-0000-000000000105", syntax_exports.literal);
var json = makeType(spec, "00000000-0000-0000-0000-00000000010f", syntax_exports.literal);
var $sequence = makeType(spec, "fd1c52ea-74a9-541b-88e2-378d1edb02fd", syntax_exports.literal);
var str = makeType(spec, "00000000-0000-0000-0000-000000000101", syntax_exports.literal);
var uuid = makeType(spec, "00000000-0000-0000-0000-000000000100", syntax_exports.literal);
var number = makeType(spec, "00000000-0000-0000-0000-0000000001ff", syntax_exports.literal);
var $BaseObject = makeType(spec, "0d14e49f-d9f9-51f0-b8f4-c432982cbac2", syntax_exports.literal);
var BaseObject = syntax_exports.$PathNode($toSet($BaseObject, reflection_exports.Cardinality.Many), null);
var $Object_8ce8c71ee4fa5f73840c22d7eaa58588 = makeType(spec, "8ce8c71e-e4fa-5f73-840c-22d7eaa58588", syntax_exports.literal);
var Object_8ce8c71ee4fa5f73840c22d7eaa58588 = syntax_exports.$PathNode($toSet($Object_8ce8c71ee4fa5f73840c22d7eaa58588, reflection_exports.Cardinality.Many), null);
var $FreeObject2 = makeType(spec, "3b741934-07ef-5b95-b7d6-cdc864fd2ae8", syntax_exports.literal);
var FreeObject2 = syntax_exports.$PathNode($toSet($FreeObject2, reflection_exports.Cardinality.One), null);
function assert_single(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::assert_single", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], namedArgs: { "message": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "OptionalType", preservesOptionality: true }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::assert_single",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function assert_exists(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::assert_exists", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], namedArgs: { "message": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::assert_exists",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function assert_distinct(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::assert_distinct", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], namedArgs: { "message": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType", preservesOptionality: true }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::assert_distinct",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function assert(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::assert", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: false, variadic: false }], namedArgs: { "message": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::assert",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function len(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::len", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::len",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function sum(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::sum", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::sum",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function count(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::count", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::count",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function random(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::random", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::random",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function min(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::min", args, spec, [
    { args: [{ typeId: "04976545-1176-5536-8673-c9f7d18d581b", optional: false, setoftype: true, variadic: false }], returnTypeId: "04976545-1176-5536-8673-c9f7d18d581b", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: true, variadic: false }], returnTypeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010e", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000112", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "3a39c464-a115-5b5e-8968-fb30b2c6a7a1", optional: false, setoftype: true, variadic: false }], returnTypeId: "3a39c464-a115-5b5e-8968-fb30b2c6a7a1", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "80d4b62c-e31c-51c6-b994-afaae5b6eff6", optional: false, setoftype: true, variadic: false }], returnTypeId: "80d4b62c-e31c-51c6-b994-afaae5b6eff6", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "d9d5e4a4-d545-5a03-a9da-571d8807619f", optional: false, setoftype: true, variadic: false }], returnTypeId: "d9d5e4a4-d545-5a03-a9da-571d8807619f", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "2417884d-4995-5a45-8c61-614adab347a7", optional: false, setoftype: true, variadic: false }], returnTypeId: "2417884d-4995-5a45-8c61-614adab347a7", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "fd652c7f-67e3-516f-b508-c8e6f227311e", optional: false, setoftype: true, variadic: false }], returnTypeId: "fd652c7f-67e3-516f-b508-c8e6f227311e", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "OptionalType", preservesOptionality: true }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::min",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function max(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::max", args, spec, [
    { args: [{ typeId: "04976545-1176-5536-8673-c9f7d18d581b", optional: false, setoftype: true, variadic: false }], returnTypeId: "04976545-1176-5536-8673-c9f7d18d581b", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: true, variadic: false }], returnTypeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010e", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000112", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "3a39c464-a115-5b5e-8968-fb30b2c6a7a1", optional: false, setoftype: true, variadic: false }], returnTypeId: "3a39c464-a115-5b5e-8968-fb30b2c6a7a1", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "80d4b62c-e31c-51c6-b994-afaae5b6eff6", optional: false, setoftype: true, variadic: false }], returnTypeId: "80d4b62c-e31c-51c6-b994-afaae5b6eff6", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "d9d5e4a4-d545-5a03-a9da-571d8807619f", optional: false, setoftype: true, variadic: false }], returnTypeId: "d9d5e4a4-d545-5a03-a9da-571d8807619f", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "2417884d-4995-5a45-8c61-614adab347a7", optional: false, setoftype: true, variadic: false }], returnTypeId: "2417884d-4995-5a45-8c61-614adab347a7", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "fd652c7f-67e3-516f-b508-c8e6f227311e", optional: false, setoftype: true, variadic: false }], returnTypeId: "fd652c7f-67e3-516f-b508-c8e6f227311e", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111", returnTypemod: "OptionalType", preservesOptionality: true },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "OptionalType", preservesOptionality: true }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::max",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function all(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::all", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::all",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function any(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::any", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000109", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::any",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function enumerate(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::enumerate", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "e34cf562-ee0c-58d3-a1ee-ff9fbb35bfc3", returnTypemod: "SetOfType", preservesOptionality: true }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::enumerate",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function round(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::round", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::round",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function contains(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::contains", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "581b0325-a044-58d4-aa37-3a85ea671313", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "581b0325-a044-58d4-aa37-3a85ea671313", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "1e76d7c5-b67c-542c-bc8f-238b93ff1726", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "e294f13d-34ee-529f-b7f8-7c3e2fd17e6e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::contains",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function array_get(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::array_get", args, spec, [
    { args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], namedArgs: { "default": { typeId: "00000000-0000-0000-0000-000000000001", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::array_get",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function find(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::find", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::find",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bit_and(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bit_and", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bit_and",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bit_or(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bit_or", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bit_or",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bit_xor(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bit_xor", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bit_xor",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bit_not(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bit_not", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bit_not",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bit_rshift(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bit_rshift", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bit_rshift",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bit_lshift(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bit_lshift", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bit_lshift",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function array_agg(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::array_agg", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: true, variadic: false }], returnTypeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::array_agg",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function array_unpack(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::array_unpack", args, spec, [
    { args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000001", returnTypemod: "SetOfType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::array_unpack",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function array_fill(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::array_fill", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::array_fill",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function array_replace(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::array_replace", args, spec, [
    { args: [{ typeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000001", optional: false, setoftype: false, variadic: false }], returnTypeId: "a6f5468c-c2a6-5852-8f73-57484b1c6831" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::array_replace",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function array_join(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::array_join", args, spec, [
    { args: [{ typeId: "bb221d39-09f1-507e-8851-62075bb61823", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "48aa45ef-4d93-5fbd-bfb5-81bf67b49eab", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000102" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::array_join",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bytes_get_bit(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bytes_get_bit", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bytes_get_bit",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function datetime_current(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::datetime_current", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-00000000010a" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::datetime_current",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function datetime_of_transaction(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::datetime_of_transaction", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-00000000010a" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::datetime_of_transaction",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function datetime_of_statement(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::datetime_of_statement", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-00000000010a" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::datetime_of_statement",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function datetime_get(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::datetime_get", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::datetime_get",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function datetime_truncate(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::datetime_truncate", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::datetime_truncate",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function duration_get(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::duration_get", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::duration_get",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function duration_truncate(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::duration_truncate", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010e" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000112" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::duration_truncate",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function duration_to_seconds(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::duration_to_seconds", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::duration_to_seconds",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function json_typeof(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::json_typeof", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::json_typeof",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function json_array_unpack(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::json_array_unpack", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010f", returnTypemod: "SetOfType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::json_array_unpack",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function json_object_unpack(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::json_object_unpack", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }], returnTypeId: "416fe1a6-d62c-5481-80cd-2102a37b3415", returnTypemod: "SetOfType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::json_object_unpack",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function json_object_pack(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::json_object_pack", args, spec, [
    { args: [{ typeId: "416fe1a6-d62c-5481-80cd-2102a37b3415", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010f" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::json_object_pack",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function json_get(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::json_get", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: true }], namedArgs: { "default": { typeId: "00000000-0000-0000-0000-00000000010f", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-00000000010f", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::json_get",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function json_set(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::json_set", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: true }], namedArgs: { "value": { typeId: "00000000-0000-0000-0000-00000000010f", optional: true, setoftype: false, variadic: false }, "create_if_missing": { typeId: "00000000-0000-0000-0000-000000000109", optional: true, setoftype: false, variadic: false }, "empty_treatment": { typeId: "584feb89-c83d-561d-aa78-24e6d779f044", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-00000000010f", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::json_set",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function range_unpack(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::range_unpack", args, spec, [
    { args: [{ typeId: "356c02b7-20fa-5d27-90fc-aa628dd37c5e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "SetOfType" },
    { args: [{ typeId: "38b58945-dfd2-572c-bf7e-8cadf204a2ec", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "SetOfType" },
    { args: [{ typeId: "1e76d7c5-b67c-542c-bc8f-238b93ff1726", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c", returnTypemod: "SetOfType" },
    { args: [{ typeId: "38b58945-dfd2-572c-bf7e-8cadf204a2ec", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "SetOfType" },
    { args: [{ typeId: "356c02b7-20fa-5d27-90fc-aa628dd37c5e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "SetOfType" },
    { args: [{ typeId: "ef0fdfe1-43f9-5954-b804-56e9b7015ffc", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "SetOfType" },
    { args: [{ typeId: "b2f8ab6d-ebca-517d-9f16-086423c5bb9c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "SetOfType" },
    { args: [{ typeId: "10674aaf-8d88-5593-abe9-f7d82be5162b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a", returnTypemod: "SetOfType" },
    { args: [{ typeId: "1e76d7c5-b67c-542c-bc8f-238b93ff1726", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c", returnTypemod: "SetOfType" },
    { args: [{ typeId: "c61dd200-697a-5b70-9ff0-6c623a700c14", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108", returnTypemod: "SetOfType" },
    { args: [{ typeId: "c4441320-c6b5-5f6a-95e4-0dd4aad4e49f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b", returnTypemod: "SetOfType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::range_unpack",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function re_match(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::re_match", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "bb221d39-09f1-507e-8851-62075bb61823" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::re_match",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function re_match_all(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::re_match_all", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "bb221d39-09f1-507e-8851-62075bb61823", returnTypemod: "SetOfType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::re_match_all",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function re_test(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::re_test", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::re_test",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function re_replace(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::re_replace", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], namedArgs: { "flags": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::re_replace",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_repeat(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_repeat", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_repeat",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_lower(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_lower", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_lower",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_upper(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_upper", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_upper",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_title(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_title", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_title",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_pad_start(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_pad_start", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_pad_start",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_lpad(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_lpad", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_lpad",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_pad_end(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_pad_end", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_pad_end",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_rpad(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_rpad", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_rpad",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_trim_start(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_trim_start", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_trim_start",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_ltrim(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_ltrim", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_ltrim",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_trim_end(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_trim_end", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_trim_end",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_rtrim(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_rtrim", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_rtrim",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_trim(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_trim", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_trim",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_split(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_split", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "bb221d39-09f1-507e-8851-62075bb61823" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_split",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_replace(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_replace", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_replace",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function str_reverse(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::str_reverse", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::str_reverse",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function uuid_generate_v1mc(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::uuid_generate_v1mc", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-000000000100" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::uuid_generate_v1mc",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function uuid_generate_v4(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::uuid_generate_v4", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-000000000100" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::uuid_generate_v4",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var range2 = syntax_exports.$range;
function multirange(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::multirange", args, spec, [
    { args: [{ typeId: "3ed001c4-98e8-53a8-b2d1-0cad168d926c", optional: false, setoftype: false, variadic: false }], returnTypeId: "c3231f27-c8a1-5a0c-9830-c71206020eac" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::multirange",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function range_is_empty(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::range_is_empty", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::range_is_empty",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function strictly_above(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::strictly_above", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::strictly_above",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function range_get_upper(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::range_get_upper", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "581b0325-a044-58d4-aa37-3a85ea671313", returnTypemod: "OptionalType" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "581b0325-a044-58d4-aa37-3a85ea671313", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::range_get_upper",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function range_get_lower(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::range_get_lower", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "581b0325-a044-58d4-aa37-3a85ea671313", returnTypemod: "OptionalType" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "581b0325-a044-58d4-aa37-3a85ea671313", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::range_get_lower",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function range_is_inclusive_upper(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::range_is_inclusive_upper", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::range_is_inclusive_upper",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function range_is_inclusive_lower(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::range_is_inclusive_lower", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::range_is_inclusive_lower",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function overlaps(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::overlaps", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::overlaps",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function multirange_unpack(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::multirange_unpack", args, spec, [
    { args: [{ typeId: "a36a494d-f2c1-5886-8e17-b0c8ba9337ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "38b58945-dfd2-572c-bf7e-8cadf204a2ec", returnTypemod: "SetOfType" },
    { args: [{ typeId: "da3c9da3-1b79-53d0-ae36-82026533939b", optional: false, setoftype: false, variadic: false }], returnTypeId: "356c02b7-20fa-5d27-90fc-aa628dd37c5e", returnTypemod: "SetOfType" },
    { args: [{ typeId: "18b39277-efe3-582c-8bdc-b18f4ed46e09", optional: false, setoftype: false, variadic: false }], returnTypeId: "ef0fdfe1-43f9-5954-b804-56e9b7015ffc", returnTypemod: "SetOfType" },
    { args: [{ typeId: "75f5b5c7-f201-56a8-9fd0-bd139e69fdbe", optional: false, setoftype: false, variadic: false }], returnTypeId: "b2f8ab6d-ebca-517d-9f16-086423c5bb9c", returnTypemod: "SetOfType" },
    { args: [{ typeId: "80da35c5-4ed6-5799-8eea-1c5923a3f8d3", optional: false, setoftype: false, variadic: false }], returnTypeId: "c61dd200-697a-5b70-9ff0-6c623a700c14", returnTypemod: "SetOfType" },
    { args: [{ typeId: "58da8bd4-709a-50bc-b0b4-a1918b7dc2ba", optional: false, setoftype: false, variadic: false }], returnTypeId: "10674aaf-8d88-5593-abe9-f7d82be5162b", returnTypemod: "SetOfType" },
    { args: [{ typeId: "1990bea3-4cb3-5881-9641-8727f5d2af59", optional: false, setoftype: false, variadic: false }], returnTypeId: "c4441320-c6b5-5f6a-95e4-0dd4aad4e49f", returnTypemod: "SetOfType" },
    { args: [{ typeId: "e294f13d-34ee-529f-b7f8-7c3e2fd17e6e", optional: false, setoftype: false, variadic: false }], returnTypeId: "1e76d7c5-b67c-542c-bc8f-238b93ff1726", returnTypemod: "SetOfType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::multirange_unpack",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function strictly_below(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::strictly_below", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::strictly_below",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bounded_above(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bounded_above", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bounded_above",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function bounded_below(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::bounded_below", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::bounded_below",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function adjacent(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::adjacent", args, spec, [
    { args: [{ typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }, { typeId: "49748e47-8d91-5269-9a34-2e8ca194e0f2", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" },
    { args: [{ typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }, { typeId: "c3231f27-c8a1-5a0c-9830-c71206020eac", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000109" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::adjacent",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_str(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_str", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "bb221d39-09f1-507e-8851-62075bb61823", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010f", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_str",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_bytes(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_bytes", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000102" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000100", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000102" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "e4a1d11b-227e-5744-a0c9-31f9cd756e7b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000102" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_bytes",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_json(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_json", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010f" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_json",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_datetime(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_datetime", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010b", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010a" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_datetime",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_duration(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_duration", args, spec, [
    { args: [], namedArgs: { "hours": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "minutes": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "seconds": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "microseconds": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-00000000010e" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_duration",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_bigint(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_bigint", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_bigint",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_decimal(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_decimal", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_decimal",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_int64(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_int64", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "e4a1d11b-227e-5744-a0c9-31f9cd756e7b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_int64",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_int32(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_int32", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "e4a1d11b-227e-5744-a0c9-31f9cd756e7b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_int32",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_int16(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_int16", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }, { typeId: "e4a1d11b-227e-5744-a0c9-31f9cd756e7b", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_int16",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_float64(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_float64", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_float64",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_float32(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_float32", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_float32",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_uuid(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::to_uuid", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000102", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000100" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::to_uuid",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function sequence_reset(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::sequence_reset", args, spec, [
    { args: [{ typeId: "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::sequence_reset",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function sequence_next(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("std::sequence_next", args, spec, [
    { args: [{ typeId: "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "std::sequence_next",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var __defaultExports2 = {
  "Endian": Endian,
  "JsonEmpty": JsonEmpty,
  "bigint": bigint,
  "bool": bool,
  "bytes": bytes,
  "datetime": datetime,
  "decimal": decimal,
  "duration": duration,
  "float32": float32,
  "float64": float64,
  "int16": int16,
  "int32": int32,
  "int64": int64,
  "json": json,
  "str": str,
  "uuid": uuid,
  "BaseObject": BaseObject,
  "Object": Object_8ce8c71ee4fa5f73840c22d7eaa58588,
  "FreeObject": FreeObject2,
  "assert_single": assert_single,
  "assert_exists": assert_exists,
  "assert_distinct": assert_distinct,
  "assert": assert,
  "len": len,
  "sum": sum,
  "count": count,
  "random": random,
  "min": min,
  "max": max,
  "all": all,
  "any": any,
  "enumerate": enumerate,
  "round": round,
  "contains": contains,
  "array_get": array_get,
  "find": find,
  "bit_and": bit_and,
  "bit_or": bit_or,
  "bit_xor": bit_xor,
  "bit_not": bit_not,
  "bit_rshift": bit_rshift,
  "bit_lshift": bit_lshift,
  "array_agg": array_agg,
  "array_unpack": array_unpack,
  "array_fill": array_fill,
  "array_replace": array_replace,
  "array_join": array_join,
  "bytes_get_bit": bytes_get_bit,
  "datetime_current": datetime_current,
  "datetime_of_transaction": datetime_of_transaction,
  "datetime_of_statement": datetime_of_statement,
  "datetime_get": datetime_get,
  "datetime_truncate": datetime_truncate,
  "duration_get": duration_get,
  "duration_truncate": duration_truncate,
  "duration_to_seconds": duration_to_seconds,
  "json_typeof": json_typeof,
  "json_array_unpack": json_array_unpack,
  "json_object_unpack": json_object_unpack,
  "json_object_pack": json_object_pack,
  "json_get": json_get,
  "json_set": json_set,
  "range_unpack": range_unpack,
  "re_match": re_match,
  "re_match_all": re_match_all,
  "re_test": re_test,
  "re_replace": re_replace,
  "str_repeat": str_repeat,
  "str_lower": str_lower,
  "str_upper": str_upper,
  "str_title": str_title,
  "str_pad_start": str_pad_start,
  "str_lpad": str_lpad,
  "str_pad_end": str_pad_end,
  "str_rpad": str_rpad,
  "str_trim_start": str_trim_start,
  "str_ltrim": str_ltrim,
  "str_trim_end": str_trim_end,
  "str_rtrim": str_rtrim,
  "str_trim": str_trim,
  "str_split": str_split,
  "str_replace": str_replace,
  "str_reverse": str_reverse,
  "uuid_generate_v1mc": uuid_generate_v1mc,
  "uuid_generate_v4": uuid_generate_v4,
  "range": range2,
  "multirange": multirange,
  "range_is_empty": range_is_empty,
  "strictly_above": strictly_above,
  "range_get_upper": range_get_upper,
  "range_get_lower": range_get_lower,
  "range_is_inclusive_upper": range_is_inclusive_upper,
  "range_is_inclusive_lower": range_is_inclusive_lower,
  "overlaps": overlaps,
  "multirange_unpack": multirange_unpack,
  "strictly_below": strictly_below,
  "bounded_above": bounded_above,
  "bounded_below": bounded_below,
  "adjacent": adjacent,
  "to_str": to_str,
  "to_bytes": to_bytes,
  "to_json": to_json,
  "to_datetime": to_datetime,
  "to_duration": to_duration,
  "to_bigint": to_bigint,
  "to_decimal": to_decimal,
  "to_int64": to_int64,
  "to_int32": to_int32,
  "to_int16": to_int16,
  "to_float64": to_float64,
  "to_float32": to_float32,
  "to_uuid": to_uuid,
  "sequence_reset": sequence_reset,
  "sequence_next": sequence_next,
  "enc": enc_default
};
var std_default = __defaultExports2;

// src/db/schema/edgeql-js/modules/cal.ts
var date_duration = makeType(spec, "00000000-0000-0000-0000-000000000112", syntax_exports.literal);
var local_date = makeType(spec, "00000000-0000-0000-0000-00000000010c", syntax_exports.literal);
var local_datetime = makeType(spec, "00000000-0000-0000-0000-00000000010b", syntax_exports.literal);
var local_time = makeType(spec, "00000000-0000-0000-0000-00000000010d", syntax_exports.literal);
var relative_duration = makeType(spec, "00000000-0000-0000-0000-000000000111", syntax_exports.literal);
function to_local_datetime(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::to_local_datetime", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010b" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::to_local_datetime",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_local_date(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::to_local_date", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010c" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::to_local_date",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_local_time(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::to_local_time", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d" },
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010a", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-00000000010d" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::to_local_time",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_relative_duration(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::to_relative_duration", args, spec, [
    { args: [], namedArgs: { "years": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "months": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "days": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "hours": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "minutes": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "seconds": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "microseconds": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000111" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::to_relative_duration",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function to_date_duration(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::to_date_duration", args, spec, [
    { args: [], namedArgs: { "years": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "months": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false }, "days": { typeId: "00000000-0000-0000-0000-0000000001ff", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000112" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::to_date_duration",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function time_get(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::time_get", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010d", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::time_get",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function date_get(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::date_get", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-00000000010c", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::date_get",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function duration_normalize_hours(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::duration_normalize_hours", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::duration_normalize_hours",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function duration_normalize_days(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cal::duration_normalize_days", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000112", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000112" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000111", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000111" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cal::duration_normalize_days",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var __defaultExports3 = {
  "date_duration": date_duration,
  "local_date": local_date,
  "local_datetime": local_datetime,
  "local_time": local_time,
  "relative_duration": relative_duration,
  "to_local_datetime": to_local_datetime,
  "to_local_date": to_local_date,
  "to_local_time": to_local_time,
  "to_relative_duration": to_relative_duration,
  "to_date_duration": to_date_duration,
  "time_get": time_get,
  "date_get": date_get,
  "duration_normalize_hours": duration_normalize_hours,
  "duration_normalize_days": duration_normalize_days
};
var cal_default = __defaultExports3;

// src/db/schema/edgeql-js/modules/cfg.ts
var AllowBareDDL = makeType(spec, "50264e27-859e-5d2b-a589-ebb3d8ba4d8c", syntax_exports.literal);
var ConnectionTransport = makeType(spec, "1adbf789-39c3-5070-bc17-776f94d59e46", syntax_exports.literal);
var QueryCacheMode = makeType(spec, "7cb23cda-17b8-575c-9561-05e2e9351897", syntax_exports.literal);
var memory = makeType(spec, "00000000-0000-0000-0000-000000000130", syntax_exports.literal);
var $ConfigObject = makeType(spec, "d408002f-3891-5b9a-b19c-23589a88998b", syntax_exports.literal);
var ConfigObject = syntax_exports.$PathNode($toSet($ConfigObject, reflection_exports.Cardinality.Many), null);
var $AbstractConfig = makeType(spec, "8b66e734-a01e-5638-a812-359e0d005a37", syntax_exports.literal);
var AbstractConfig = syntax_exports.$PathNode($toSet($AbstractConfig, reflection_exports.Cardinality.Many), null);
var $Auth = makeType(spec, "a2ba7516-d398-5ec2-b25e-221b2f7b9e87", syntax_exports.literal);
var Auth = syntax_exports.$PathNode($toSet($Auth, reflection_exports.Cardinality.Many), null);
var $AuthMethod = makeType(spec, "128fcc80-bf32-5bdc-abac-09cf1532a7c1", syntax_exports.literal);
var AuthMethod = syntax_exports.$PathNode($toSet($AuthMethod, reflection_exports.Cardinality.Many), null);
var $DatabaseConfig = makeType(spec, "c046988e-25f8-55b8-8d94-9e2a13d7625f", syntax_exports.literal);
var DatabaseConfig = syntax_exports.$PathNode($toSet($DatabaseConfig, reflection_exports.Cardinality.Many), null);
var $BranchConfig = makeType(spec, "b8b6fefa-f0c7-5eea-9f2f-98a5222c7c5e", syntax_exports.literal);
var BranchConfig = syntax_exports.$PathNode($toSet($BranchConfig, reflection_exports.Cardinality.Many), null);
var $Config = makeType(spec, "363133b1-e993-50a0-94d3-aa0472b1a0a7", syntax_exports.literal);
var Config = syntax_exports.$PathNode($toSet($Config, reflection_exports.Cardinality.Many), null);
var $ExtensionConfig = makeType(spec, "89fb9b8b-d3b2-5075-9d1a-f5b116a0f188", syntax_exports.literal);
var ExtensionConfig = syntax_exports.$PathNode($toSet($ExtensionConfig, reflection_exports.Cardinality.Many), null);
var $InstanceConfig = makeType(spec, "d9e9f342-7992-544c-b6af-459302121188", syntax_exports.literal);
var InstanceConfig = syntax_exports.$PathNode($toSet($InstanceConfig, reflection_exports.Cardinality.Many), null);
var $JWT = makeType(spec, "4e795376-37e8-5381-8ae4-d621c80bbc7b", syntax_exports.literal);
var JWT = syntax_exports.$PathNode($toSet($JWT, reflection_exports.Cardinality.Many), null);
var $Password = makeType(spec, "9df8c566-c274-5d75-a948-2d901505d7de", syntax_exports.literal);
var Password = syntax_exports.$PathNode($toSet($Password, reflection_exports.Cardinality.Many), null);
var $SCRAM = makeType(spec, "ca43bc46-6dd2-55fc-98dc-358978df0f24", syntax_exports.literal);
var SCRAM = syntax_exports.$PathNode($toSet($SCRAM, reflection_exports.Cardinality.Many), null);
var $Trust = makeType(spec, "7fc09ace-4af4-5d90-a9ab-94f9bb4cdb42", syntax_exports.literal);
var Trust = syntax_exports.$PathNode($toSet($Trust, reflection_exports.Cardinality.Many), null);
var $mTLS = makeType(spec, "e96db572-9980-5ce1-8049-1561b3980d0e", syntax_exports.literal);
var mTLS = syntax_exports.$PathNode($toSet($mTLS, reflection_exports.Cardinality.Many), null);
function get_config_json(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("cfg::get_config_json", args, spec, [
    { args: [], namedArgs: { "sources": { typeId: "bb221d39-09f1-507e-8851-62075bb61823", optional: true, setoftype: false, variadic: false }, "max_source": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-00000000010f" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cfg::get_config_json",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var __defaultExports4 = {
  "AllowBareDDL": AllowBareDDL,
  "ConnectionTransport": ConnectionTransport,
  "QueryCacheMode": QueryCacheMode,
  "memory": memory,
  "ConfigObject": ConfigObject,
  "AbstractConfig": AbstractConfig,
  "Auth": Auth,
  "AuthMethod": AuthMethod,
  "DatabaseConfig": DatabaseConfig,
  "BranchConfig": BranchConfig,
  "Config": Config,
  "ExtensionConfig": ExtensionConfig,
  "InstanceConfig": InstanceConfig,
  "JWT": JWT,
  "Password": Password,
  "SCRAM": SCRAM,
  "Trust": Trust,
  "mTLS": mTLS,
  "get_config_json": get_config_json
};
var cfg_default = __defaultExports4;

// src/db/schema/edgeql-js/modules/fts.ts
var ElasticLanguage = makeType(spec, "68098129-5cf4-5272-8c64-2504e3dd95ad", syntax_exports.literal);
var Language = makeType(spec, "4e291f3c-c871-56fb-b07a-0e841552c500", syntax_exports.literal);
var LuceneLanguage = makeType(spec, "30696cb3-efd2-5146-8338-9ccc4ada0523", syntax_exports.literal);
var PGLanguage = makeType(spec, "946d99dc-5330-5d27-9c74-3e8e522e0df3", syntax_exports.literal);
var Weight = makeType(spec, "6ff6d8f7-ff4e-5653-af31-2976f6d87159", syntax_exports.literal);
var document = makeType(spec, "82a03701-64a0-526d-9e43-397ce1e2022f", syntax_exports.literal);
function with_options(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("fts::with_options", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], namedArgs: { "language": { typeId: "48896eaf-b8af-5f80-9073-0884475d6ee5", optional: false, setoftype: false, variadic: false }, "weight_category": { typeId: "6ff6d8f7-ff4e-5653-af31-2976f6d87159", optional: true, setoftype: false, variadic: false } }, returnTypeId: "82a03701-64a0-526d-9e43-397ce1e2022f" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "fts::with_options",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function search(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("fts::search", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000003", optional: false, setoftype: false, variadic: false }, { typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false }], namedArgs: { "language": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false }, "weights": { typeId: "2b65df4c-4942-59b1-8819-061ca68b2f4e", optional: true, setoftype: false, variadic: false } }, returnTypeId: "c13eb6f1-a05c-533f-bfe8-a50b1a077fd0", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "fts::search",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var __defaultExports5 = {
  "ElasticLanguage": ElasticLanguage,
  "Language": Language,
  "LuceneLanguage": LuceneLanguage,
  "PGLanguage": PGLanguage,
  "Weight": Weight,
  "document": document,
  "with_options": with_options,
  "search": search
};
var fts_default = __defaultExports5;

// src/db/schema/edgeql-js/modules/schema.ts
var AccessKind = makeType(spec, "998b88fc-083a-584b-85bb-372ade248f66", syntax_exports.literal);
var AccessPolicyAction = makeType(spec, "d8c466cc-109e-587c-aff8-42e50705b5b0", syntax_exports.literal);
var Cardinality17 = makeType(spec, "94abc2f6-2e3e-55fc-8e97-b44ba70a3950", syntax_exports.literal);
var MigrationGeneratedBy = makeType(spec, "8fcfde20-139b-5c17-93b9-9a49512b83dc", syntax_exports.literal);
var OperatorKind3 = makeType(spec, "e48403f0-7017-5bf5-ab92-22825d9f1090", syntax_exports.literal);
var ParameterKind = makeType(spec, "8037d84a-de95-5e63-ab76-727112419261", syntax_exports.literal);
var RewriteKind = makeType(spec, "a06f04aa-88b7-5d9a-b520-b8139fd64d0c", syntax_exports.literal);
var SourceDeleteAction = makeType(spec, "1c938388-8739-57a7-8095-cc173226ad8e", syntax_exports.literal);
var TargetDeleteAction = makeType(spec, "6b925c92-5e48-5e6d-96f2-4125d9119b66", syntax_exports.literal);
var TriggerKind = makeType(spec, "3c6fa29f-8481-59c9-a9bf-ac30ab50be32", syntax_exports.literal);
var TriggerScope = makeType(spec, "20998fe7-4392-5673-96b5-5f1cd736b5df", syntax_exports.literal);
var TriggerTiming = makeType(spec, "a2c7e6ae-370c-53a7-842c-21e238faf3ee", syntax_exports.literal);
var TypeModifier = makeType(spec, "67722d75-1145-54b6-af26-94602de09d51", syntax_exports.literal);
var Volatility = makeType(spec, "de5b90f2-6e49-5543-991b-28a156c7867f", syntax_exports.literal);
var $Object_32faaa35947553cf88fce68ecf1be4d9 = makeType(spec, "32faaa35-9475-53cf-88fc-e68ecf1be4d9", syntax_exports.literal);
var Object_32faaa35947553cf88fce68ecf1be4d9 = syntax_exports.$PathNode($toSet($Object_32faaa35947553cf88fce68ecf1be4d9, reflection_exports.Cardinality.Many), null);
var $SubclassableObject = makeType(spec, "145b7b6f-8fa4-5b14-bcd3-5d6d10dc25da", syntax_exports.literal);
var SubclassableObject = syntax_exports.$PathNode($toSet($SubclassableObject, reflection_exports.Cardinality.Many), null);
var $InheritingObject = makeType(spec, "825a1378-6b30-5f15-82f1-1c92e57691f2", syntax_exports.literal);
var InheritingObject = syntax_exports.$PathNode($toSet($InheritingObject, reflection_exports.Cardinality.Many), null);
var $AnnotationSubject = makeType(spec, "970b2d83-85d8-5a46-a4e8-337d28abc12e", syntax_exports.literal);
var AnnotationSubject = syntax_exports.$PathNode($toSet($AnnotationSubject, reflection_exports.Cardinality.Many), null);
var $AccessPolicy = makeType(spec, "a8462073-0539-5640-9d9d-2db251c0b350", syntax_exports.literal);
var AccessPolicy = syntax_exports.$PathNode($toSet($AccessPolicy, reflection_exports.Cardinality.Many), null);
var $Alias = makeType(spec, "4388400b-e01d-582c-b1da-8161814835a6", syntax_exports.literal);
var Alias = syntax_exports.$PathNode($toSet($Alias, reflection_exports.Cardinality.Many), null);
var $Annotation = makeType(spec, "273b8735-318f-53f6-9297-6f20162c9105", syntax_exports.literal);
var Annotation = syntax_exports.$PathNode($toSet($Annotation, reflection_exports.Cardinality.Many), null);
var $Type = makeType(spec, "8e652319-e551-5b5c-a7bd-9591f0ef5303", syntax_exports.literal);
var Type = syntax_exports.$PathNode($toSet($Type, reflection_exports.Cardinality.Many), null);
var $PrimitiveType = makeType(spec, "da26fa09-3541-5cba-b93f-d5ba58d25589", syntax_exports.literal);
var PrimitiveType = syntax_exports.$PathNode($toSet($PrimitiveType, reflection_exports.Cardinality.Many), null);
var $CollectionType = makeType(spec, "e3a7ccf7-4a20-5151-80b3-5156c9373889", syntax_exports.literal);
var CollectionType = syntax_exports.$PathNode($toSet($CollectionType, reflection_exports.Cardinality.Many), null);
var $Array = makeType(spec, "283cc7a9-7bf6-5eda-a323-b4e5173f2927", syntax_exports.literal);
var Array2 = syntax_exports.$PathNode($toSet($Array, reflection_exports.Cardinality.Many), null);
var $ArrayExprAlias = makeType(spec, "2e55d7f5-18ed-54b4-ade0-ba404dd482d3", syntax_exports.literal);
var ArrayExprAlias = syntax_exports.$PathNode($toSet($ArrayExprAlias, reflection_exports.Cardinality.Many), null);
var $CallableObject = makeType(spec, "800f2df9-dd86-5681-9e3c-b529af481a9d", syntax_exports.literal);
var CallableObject = syntax_exports.$PathNode($toSet($CallableObject, reflection_exports.Cardinality.Many), null);
var $VolatilitySubject = makeType(spec, "ed8e20ca-f2dc-5626-bccb-05ef9ed65791", syntax_exports.literal);
var VolatilitySubject = syntax_exports.$PathNode($toSet($VolatilitySubject, reflection_exports.Cardinality.Many), null);
var $Cast = makeType(spec, "2b25c5a4-5ad4-5c4b-b545-574ccac3fd7f", syntax_exports.literal);
var Cast = syntax_exports.$PathNode($toSet($Cast, reflection_exports.Cardinality.Many), null);
var $ConsistencySubject = makeType(spec, "883ec593-7428-5707-af16-d446e5d8ed28", syntax_exports.literal);
var ConsistencySubject = syntax_exports.$PathNode($toSet($ConsistencySubject, reflection_exports.Cardinality.Many), null);
var $Constraint = makeType(spec, "9346c403-6ee6-50b6-81b2-a35551cfab2f", syntax_exports.literal);
var Constraint = syntax_exports.$PathNode($toSet($Constraint, reflection_exports.Cardinality.Many), null);
var $Delta = makeType(spec, "c974be74-46d8-5848-b2a9-be5eda14f73e", syntax_exports.literal);
var Delta = syntax_exports.$PathNode($toSet($Delta, reflection_exports.Cardinality.Many), null);
var $Extension = makeType(spec, "b9c53751-8d28-5077-b1db-a03ea59557ed", syntax_exports.literal);
var Extension = syntax_exports.$PathNode($toSet($Extension, reflection_exports.Cardinality.Many), null);
var $Function = makeType(spec, "3a60f555-7c03-5287-b4c9-f078692a89ef", syntax_exports.literal);
var Function = syntax_exports.$PathNode($toSet($Function, reflection_exports.Cardinality.Many), null);
var $FutureBehavior = makeType(spec, "003feed0-dc7d-564e-abb5-93a42ba99d64", syntax_exports.literal);
var FutureBehavior = syntax_exports.$PathNode($toSet($FutureBehavior, reflection_exports.Cardinality.Many), null);
var $Global = makeType(spec, "e1294378-bb3d-57e0-81d2-6a19ea088231", syntax_exports.literal);
var Global = syntax_exports.$PathNode($toSet($Global, reflection_exports.Cardinality.Many), null);
var $Index = makeType(spec, "decfa7fb-1f66-5986-be86-fc9b6c268a97", syntax_exports.literal);
var Index = syntax_exports.$PathNode($toSet($Index, reflection_exports.Cardinality.Many), null);
var $Pointer = makeType(spec, "57e1c6b1-ce76-5b5b-943f-f01f1e6a16a3", syntax_exports.literal);
var Pointer = syntax_exports.$PathNode($toSet($Pointer, reflection_exports.Cardinality.Many), null);
var $Source = makeType(spec, "0368bb5e-ae06-5c00-9316-15095185b828", syntax_exports.literal);
var Source = syntax_exports.$PathNode($toSet($Source, reflection_exports.Cardinality.Many), null);
var $Link = makeType(spec, "98fe77cc-128e-58fe-b87a-1251c3288548", syntax_exports.literal);
var Link = syntax_exports.$PathNode($toSet($Link, reflection_exports.Cardinality.Many), null);
var $Migration = makeType(spec, "31f74b3a-d9b1-5e35-a746-057f44c58e76", syntax_exports.literal);
var Migration = syntax_exports.$PathNode($toSet($Migration, reflection_exports.Cardinality.Many), null);
var $Module = makeType(spec, "7106039a-ed86-5868-8227-3e2fc5e3e5ec", syntax_exports.literal);
var Module = syntax_exports.$PathNode($toSet($Module, reflection_exports.Cardinality.Many), null);
var $MultiRange = makeType(spec, "800c4a49-db9d-5a39-9cf2-aa213b858616", syntax_exports.literal);
var MultiRange = syntax_exports.$PathNode($toSet($MultiRange, reflection_exports.Cardinality.Many), null);
var $MultiRangeExprAlias = makeType(spec, "a92ef6fd-611e-5b00-8115-cc0ebb5f0be5", syntax_exports.literal);
var MultiRangeExprAlias = syntax_exports.$PathNode($toSet($MultiRangeExprAlias, reflection_exports.Cardinality.Many), null);
var $ObjectType = makeType(spec, "2662a1b4-4f3f-5875-b6eb-ce52101a90a3", syntax_exports.literal);
var ObjectType = syntax_exports.$PathNode($toSet($ObjectType, reflection_exports.Cardinality.Many), null);
var $Operator = makeType(spec, "e37bd85e-5e2f-5daa-9dd9-d21d419032be", syntax_exports.literal);
var Operator = syntax_exports.$PathNode($toSet($Operator, reflection_exports.Cardinality.Many), null);
var $Parameter = makeType(spec, "87f7d583-3e3c-507e-9fbb-4bf3b9e5aa24", syntax_exports.literal);
var Parameter = syntax_exports.$PathNode($toSet($Parameter, reflection_exports.Cardinality.Many), null);
var $Property = makeType(spec, "a57f48ff-3bb9-5693-a2e1-bf328a2ddbfc", syntax_exports.literal);
var Property = syntax_exports.$PathNode($toSet($Property, reflection_exports.Cardinality.Many), null);
var $PseudoType = makeType(spec, "0875f8c3-7033-5cc4-af04-2b6d80e289e0", syntax_exports.literal);
var PseudoType = syntax_exports.$PathNode($toSet($PseudoType, reflection_exports.Cardinality.Many), null);
var $Range = makeType(spec, "cced31f8-8167-59d7-b269-c49ae88a0ac1", syntax_exports.literal);
var Range3 = syntax_exports.$PathNode($toSet($Range, reflection_exports.Cardinality.Many), null);
var $RangeExprAlias = makeType(spec, "bc63491c-2a88-5353-b5f0-6f2188a4f65d", syntax_exports.literal);
var RangeExprAlias = syntax_exports.$PathNode($toSet($RangeExprAlias, reflection_exports.Cardinality.Many), null);
var $Rewrite = makeType(spec, "d60198c8-ad58-5c4c-b3b6-d520c19f5cef", syntax_exports.literal);
var Rewrite = syntax_exports.$PathNode($toSet($Rewrite, reflection_exports.Cardinality.Many), null);
var $ScalarType = makeType(spec, "d055dd47-3eb9-5a31-9d8f-5e7053bbe11e", syntax_exports.literal);
var ScalarType = syntax_exports.$PathNode($toSet($ScalarType, reflection_exports.Cardinality.Many), null);
var $Trigger = makeType(spec, "2b738231-1ef7-59d0-a04c-dae012181a02", syntax_exports.literal);
var Trigger = syntax_exports.$PathNode($toSet($Trigger, reflection_exports.Cardinality.Many), null);
var $Tuple = makeType(spec, "d88b4a0c-9561-56f4-b0a9-7b24027b4de8", syntax_exports.literal);
var Tuple = syntax_exports.$PathNode($toSet($Tuple, reflection_exports.Cardinality.Many), null);
var $TupleElement = makeType(spec, "9cc04b0b-11e0-5670-a8a1-441a323e12fb", syntax_exports.literal);
var TupleElement = syntax_exports.$PathNode($toSet($TupleElement, reflection_exports.Cardinality.Many), null);
var $TupleExprAlias = makeType(spec, "b7744aa3-50fc-54e0-ae51-20d78737e25b", syntax_exports.literal);
var TupleExprAlias = syntax_exports.$PathNode($toSet($TupleExprAlias, reflection_exports.Cardinality.Many), null);
var __defaultExports6 = {
  "AccessKind": AccessKind,
  "AccessPolicyAction": AccessPolicyAction,
  "Cardinality": Cardinality17,
  "MigrationGeneratedBy": MigrationGeneratedBy,
  "OperatorKind": OperatorKind3,
  "ParameterKind": ParameterKind,
  "RewriteKind": RewriteKind,
  "SourceDeleteAction": SourceDeleteAction,
  "TargetDeleteAction": TargetDeleteAction,
  "TriggerKind": TriggerKind,
  "TriggerScope": TriggerScope,
  "TriggerTiming": TriggerTiming,
  "TypeModifier": TypeModifier,
  "Volatility": Volatility,
  "Object": Object_32faaa35947553cf88fce68ecf1be4d9,
  "SubclassableObject": SubclassableObject,
  "InheritingObject": InheritingObject,
  "AnnotationSubject": AnnotationSubject,
  "AccessPolicy": AccessPolicy,
  "Alias": Alias,
  "Annotation": Annotation,
  "Type": Type,
  "PrimitiveType": PrimitiveType,
  "CollectionType": CollectionType,
  "Array": Array2,
  "ArrayExprAlias": ArrayExprAlias,
  "CallableObject": CallableObject,
  "VolatilitySubject": VolatilitySubject,
  "Cast": Cast,
  "ConsistencySubject": ConsistencySubject,
  "Constraint": Constraint,
  "Delta": Delta,
  "Extension": Extension,
  "Function": Function,
  "FutureBehavior": FutureBehavior,
  "Global": Global,
  "Index": Index,
  "Pointer": Pointer,
  "Source": Source,
  "Link": Link,
  "Migration": Migration,
  "Module": Module,
  "MultiRange": MultiRange,
  "MultiRangeExprAlias": MultiRangeExprAlias,
  "ObjectType": ObjectType,
  "Operator": Operator,
  "Parameter": Parameter,
  "Property": Property,
  "PseudoType": PseudoType,
  "Range": Range3,
  "RangeExprAlias": RangeExprAlias,
  "Rewrite": Rewrite,
  "ScalarType": ScalarType,
  "Trigger": Trigger,
  "Tuple": Tuple,
  "TupleElement": TupleElement,
  "TupleExprAlias": TupleExprAlias
};
var schema_default = __defaultExports6;

// src/db/schema/edgeql-js/modules/sys.ts
var TransactionIsolation = makeType(spec, "070715f3-0100-5580-9473-696f961243eb", syntax_exports.literal);
var VersionStage = makeType(spec, "16a08f13-b1b1-57f4-8e82-062f67fb2a4c", syntax_exports.literal);
var $SystemObject = makeType(spec, "43f8d5e9-5b2e-535b-a46b-acf8af101718", syntax_exports.literal);
var SystemObject = syntax_exports.$PathNode($toSet($SystemObject, reflection_exports.Cardinality.Many), null);
var $ExternalObject = makeType(spec, "e3838826-d523-59f9-86f4-be3cecdf0d4f", syntax_exports.literal);
var ExternalObject = syntax_exports.$PathNode($toSet($ExternalObject, reflection_exports.Cardinality.Many), null);
var $Database = makeType(spec, "fd469647-1cf1-5702-85b6-bbdb7e7f1c7e", syntax_exports.literal);
var Database = syntax_exports.$PathNode($toSet($Database, reflection_exports.Cardinality.Many), null);
var $ExtensionPackage = makeType(spec, "87787989-1e54-5529-9cc4-524cc873528d", syntax_exports.literal);
var ExtensionPackage = syntax_exports.$PathNode($toSet($ExtensionPackage, reflection_exports.Cardinality.Many), null);
var $Role = makeType(spec, "04d3804d-c37f-5969-86b2-a24309653b14", syntax_exports.literal);
var Role = syntax_exports.$PathNode($toSet($Role, reflection_exports.Cardinality.Many), null);
function get_version(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("sys::get_version", args, spec, [
    { args: [], returnTypeId: "48a4615d-2402-5744-bd11-17015ad18bb9" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_version",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function get_version_as_str(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("sys::get_version_as_str", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_version_as_str",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function get_instance_name(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("sys::get_instance_name", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_instance_name",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function get_transaction_isolation(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("sys::get_transaction_isolation", args, spec, [
    { args: [], returnTypeId: "070715f3-0100-5580-9473-696f961243eb" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_transaction_isolation",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function get_current_database(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("sys::get_current_database", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_current_database",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function get_current_branch(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("sys::get_current_branch", args, spec, [
    { args: [], returnTypeId: "00000000-0000-0000-0000-000000000101" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_current_branch",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var __defaultExports7 = {
  "TransactionIsolation": TransactionIsolation,
  "VersionStage": VersionStage,
  "SystemObject": SystemObject,
  "ExternalObject": ExternalObject,
  "Database": Database,
  "ExtensionPackage": ExtensionPackage,
  "Role": Role,
  "get_version": get_version,
  "get_version_as_str": get_version_as_str,
  "get_instance_name": get_instance_name,
  "get_transaction_isolation": get_transaction_isolation,
  "get_current_database": get_current_database,
  "get_current_branch": get_current_branch
};
var sys_default = __defaultExports7;

// src/db/schema/edgeql-js/modules/default.ts
var $Actor = makeType(spec, "4d2a3345-2bbf-11ef-9efd-f39f55c85f1d", syntax_exports.literal);
var Actor = syntax_exports.$PathNode($toSet($Actor, reflection_exports.Cardinality.Many), null);
var $Movie = makeType(spec, "4d2bb666-2bbf-11ef-9c96-91fc35593bc2", syntax_exports.literal);
var Movie = syntax_exports.$PathNode($toSet($Movie, reflection_exports.Cardinality.Many), null);
var $Payment = makeType(spec, "2f0936c1-a8c9-11ef-9642-ff223abd7071", syntax_exports.literal);
var Payment = syntax_exports.$PathNode($toSet($Payment, reflection_exports.Cardinality.Many), null);
var $User = makeType(spec, "b2a67f30-96c2-11ef-8f77-cda9e2848e59", syntax_exports.literal);
var User = syntax_exports.$PathNode($toSet($User, reflection_exports.Cardinality.Many), null);
var __defaultExports8 = {
  "Actor": Actor,
  "Movie": Movie,
  "Payment": Payment,
  "User": User
};
var default_default = __defaultExports8;

// src/db/schema/edgeql-js/modules/math.ts
function floor(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::floor", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::floor",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function ceil(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::ceil", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000110" },
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::ceil",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function abs(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::abs", args, spec, [
    { args: [{ typeId: "04976545-1176-5536-8673-c9f7d18d581b", optional: false, setoftype: false, variadic: false }], returnTypeId: "04976545-1176-5536-8673-c9f7d18d581b" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::abs",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function ln(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::ln", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::ln",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function lg(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::lg", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::lg",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function log(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::log", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], namedArgs: { "base": { typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::log",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function sqrt(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::sqrt", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::sqrt",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function mean(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::mean", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::mean",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function stddev(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::stddev", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::stddev",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function stddev_pop(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::stddev_pop", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::stddev_pop",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function var_0e9a1bf8ab9d5dc6830438e6ef6633fe(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::var", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "OptionalType" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::var",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
function var_pop(...args) {
  const { returnType, cardinality, args: positionalArgs, namedArgs } = syntax_exports.$resolveOverload("math::var_pop", args, spec, [
    { args: [{ typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "OptionalType" },
    { args: [{ typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false }], returnTypeId: "00000000-0000-0000-0000-000000000108", returnTypemod: "OptionalType" }
  ]);
  return syntax_exports.$expressionify({
    __kind__: reflection_exports.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::var_pop",
    __args__: positionalArgs,
    __namedargs__: namedArgs
  });
}
var __defaultExports9 = {
  "floor": floor,
  "ceil": ceil,
  "abs": abs,
  "ln": ln,
  "lg": lg,
  "log": log,
  "sqrt": sqrt,
  "mean": mean,
  "stddev": stddev,
  "stddev_pop": stddev_pop,
  "var": var_0e9a1bf8ab9d5dc6830438e6ef6633fe,
  "var_pop": var_pop
};
var math_default = __defaultExports9;

// src/db/schema/edgeql-js/index.ts
var ExportDefault = {
  ...std_default,
  ...default_default,
  ...reflection_exports.util.omitDollarPrefixed(syntax_exports),
  ...operators_exports,
  "std": std_default,
  "cal": cal_default,
  "cfg": cfg_default,
  "fts": fts_default,
  "schema": schema_default,
  "sys": sys_default,
  "default": default_default,
  "math": math_default
};
var edgeql_js_default = ExportDefault;

// src/db/queries/actor.ts
var addActor = async (name) => {
  const result = edgeql_js_default.insert(edgeql_js_default.Actor, {
    name
  }).run(client_default);
  return result;
};

// src/controller/actorController.ts
var import_zod = __toESM(require("zod"));
async function actorController(fastify2) {
  fastify2.post("/", {
    schema: {
      response: {
        200: import_zod.default.object({
          id: import_zod.default.string().uuid()
        }),
        404: import_zod.default.object({
          message: import_zod.default.string()
        })
      },
      body: import_zod.default.object({
        name: import_zod.default.string()
      })
    }
  }, async function(request, reply) {
    const query = request.body;
    const actor = await addActor(query.name);
    if (actor === null) {
      reply.status(404).send({ message: "No actor added" });
      return;
    }
    reply.send(actor);
  });
}

// src/db/queries/movie.ts
var getMoviesByName = async (name) => {
  const result = await edgeql_js_default.select(edgeql_js_default.Movie, (movie) => ({
    title: movie.title,
    actors: { name: true },
    filter: edgeql_js_default.op(movie.title, "ilike", `%${name}%`)
  })).run(client_default);
  return result;
};
var getMoviesByActorName = async (name) => {
  const foundActors = await edgeql_js_default.select(edgeql_js_default.Actor, (actor) => ({
    name: true,
    filter: edgeql_js_default.op(actor.name, "ilike", `%${name}%`)
  })).run(client_default);
  if (foundActors.length === 0) {
    return null;
  }
  const result = await edgeql_js_default.select(edgeql_js_default.Movie, (movie) => ({
    title: movie.title,
    actors: { name: true },
    filter: edgeql_js_default.op(movie.actors.name, "in", edgeql_js_default.set(...foundActors.map((a) => a.name)))
  })).run(client_default);
  return result;
};

// src/controller/movieController.ts
var import_zod2 = __toESM(require("zod"));
async function movieController(fastify2) {
  fastify2.get("/", {
    schema: {
      response: {
        200: import_zod2.default.array(import_zod2.default.object({
          title: import_zod2.default.string(),
          actors: import_zod2.default.array(import_zod2.default.object({
            name: import_zod2.default.string()
          }))
        })),
        404: import_zod2.default.object({
          message: import_zod2.default.string()
        })
      },
      querystring: import_zod2.default.object({
        name: import_zod2.default.string().optional(),
        actor: import_zod2.default.string().optional()
      })
    }
  }, async function(request, reply) {
    const query = request.query;
    const movieName = query.name;
    const actorName = query.actor;
    let movies = movieName ? await getMoviesByName(movieName) : actorName ? await getMoviesByActorName(actorName) : [];
    if (movies === null) {
      reply.status(404).send({ message: "No movies found" });
      return;
    }
    reply.send(movies);
  });
}

// src/controller/userController.ts
var import_config = require("dotenv/config");
var import_fastify = require("@clerk/fastify");
var import_zod3 = __toESM(require("zod"));
var import_svix = require("svix");

// src/db/queries/user.ts
var import_bcrypt = __toESM(require("bcrypt"));
var addUser = async (email, firstName, lastName, clerkId, password) => {
  const saltRounds = 10;
  const hashedPassword = await import_bcrypt.default.hash(password, saltRounds);
  const result = await edgeql_js_default.insert(edgeql_js_default.User, {
    email,
    firstName,
    lastName,
    clerkId,
    password: hashedPassword
  }).run(client_default);
  return { id: result.id, email, firstName, lastName, clerkId };
};

// src/controller/userController.ts
async function userController(fastify2) {
  fastify2.post("/", {
    schema: {
      body: import_zod3.default.object({
        firstName: import_zod3.default.string(),
        lastName: import_zod3.default.string(),
        emailAddress: import_zod3.default.string().email(),
        password: import_zod3.default.string()
      }),
      response: {
        201: import_zod3.default.object({
          user: import_zod3.default.any()
        }),
        400: import_zod3.default.object({
          error: import_zod3.default.string()
        })
      }
    }
  }, async function(request, reply) {
    try {
      const { firstName, lastName, emailAddress, password } = request.body;
      const isUserExist = await import_fastify.clerkClient.users.getUserList({
        emailAddress: [emailAddress]
      });
      if (isUserExist.data.length > 0) {
        reply.status(400).send({ error: "User already exists" });
        return;
      }
      const user = await import_fastify.clerkClient.users.createUser({
        firstName,
        lastName,
        emailAddress: [emailAddress],
        password
      });
      if (!user) {
        reply.status(400).send({ error: "Failed to create user" });
        return;
      }
      const newUser = await addUser(emailAddress, firstName, lastName, user.id, password);
      if (!newUser) {
        reply.status(400).send({ error: "Failed to add user to database" });
        return;
      }
      reply.status(201).send({ user });
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  });
  fastify2.get("/email/:email", {
    schema: {
      params: import_zod3.default.object({
        email: import_zod3.default.string().email()
      }),
      response: {
        200: import_zod3.default.object({
          user: import_zod3.default.any()
        }),
        400: import_zod3.default.object({
          error: import_zod3.default.string()
        }),
        404: import_zod3.default.object({
          error: import_zod3.default.string()
        })
      }
    }
  }, async function(request, reply) {
    try {
      const { email } = request.params;
      const users = await import_fastify.clerkClient.users.getUserList({
        emailAddress: [email]
      });
      if (users.data.length === 0) {
        reply.status(404).send({ error: "User not found" });
        return;
      }
      reply.status(200).send({ user: users.data[0] });
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  });
  fastify2.post("/webhook", {
    config: {
      raw: {
        body: true
      }
    }
  }, async function(request, reply) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      reply.status(500).send({ error: "Webhook secret is not set" });
      return;
    }
    const header = request.headers;
    const payload = request.body;
    const svix_id = header["svix-id"];
    const svix_timestamp = header["svix-timestamp"];
    const svix_signature = header["svix-signature"];
    if (!svix_id || !svix_timestamp || !svix_signature) {
      reply.status(400).send({ error: "Webhook request missing svix headers" });
      return;
    }
    console.log("xd");
    const wh = new import_svix.Webhook(WEBHOOK_SECRET);
    let evt;
    try {
      evt = wh.verify(JSON.stringify(payload), {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature
      });
    } catch (err) {
      reply.status(403).send({ error: "Failed to verify webhook signature" });
      return;
    }
    if (evt) {
      const eventType = evt.type;
      const { id } = evt.data;
      if (eventType === "user.created") {
        console.log(`User created: ${id}, ADD TO DATABASE!!!`);
      }
    }
  });
}

// src/router.ts
var import_cors = __toESM(require("@fastify/cors"));
async function router(fastify2) {
  fastify2.register(import_cors.default, {});
  const routes = [
    { controller: userController, prefix: "/api/v1/user" },
    { controller: movieController, prefix: "/api/v1/movie" },
    { controller: actorController, prefix: "/api/v1/actor" },
    { controller: indexController, prefix: "/" }
  ];
  for (const { controller, prefix } of routes) {
    fastify2.register(controller, { prefix });
  }
}

// src/app.ts
var import_config2 = require("dotenv/config");
var import_fastify3 = require("@clerk/fastify");
var server = (0, import_fastify2.default)({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development")
});
server.register(import_fastify3.clerkPlugin);
server.register(router);
var app_default = server;

// src/index.ts
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");
var FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;
app_default.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app_default.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app_default.listen({ port: FASTIFY_PORT });
console.log(`\u{1F680}  Fastify server running on port ${FASTIFY_PORT}`);
