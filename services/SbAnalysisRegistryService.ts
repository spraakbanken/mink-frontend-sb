import { once } from "es-toolkit";
import { pathJoin } from "@/util";
import type { ByLang } from "@/util.types";
import type {
  AnalysisId,
  AnalysisRegistryService,
} from "@/analyses/analyses.types";

export class SbAnalysisRegistryService implements AnalysisRegistryService {
  loadMetadata = once(async () => {
    const url = "https://ws.spraakbanken.gu.se/ws/metadata/v3/";
    const response = await fetch(pathJoin(url, "analyses"));
    const data = (await response.json()) as AnalysisMetadataResponse;

    // Only keep analyses relevant to Mink
    const filteredData = data.resources.filter(
      (resource) =>
        !resource.successors?.length &&
        !resource.collection &&
        resource.in_collections?.includes("sbx-swe-mink_analyses"),
    );

    // Convert to the expected format
    return filteredData.map((resource) => ({
      id: resource.id,
      label: resource.name,
      summary: resource.short_description,
      languages: Object.values(resource.languages)
        .map((lang) => lang.code)
        .join(", "),
      unit: resource.analysis_unit,
      task: resource.task,
    }));
  });

  getAnnotations(analysisIds: AnalysisId[]) {
    return analysisIds.flatMap((id) => analysisAnnotations[id] || []);
  }

  getAnalyses(annotations: string[]) {
    const analyses = new Set<AnalysisId>();
    annotations.forEach((annotation) => {
      const analysisId = annotationAnalyses[annotation];
      if (analysisId) analyses.add(analysisId);
    });
    return [...analyses];
  }

  async getDefaultAnalyses() {
    // Disable NER by default because it is heavy, and Geo because it depends on NER.
    const disabledAnalyses = [
      "sbx-swe-namedentity-swener",
      "sbx-swe-geotagcontext-sparv",
    ];
    const analyses = await this.loadMetadata();
    const analysisIds = analyses.map(({ id }) => id);
    return analysisIds.filter((id) => !disabledAnalyses.includes(id));
  }
}

/** Suggested annotation definitions for each known analysis id. */
const analysisAnnotations: Readonly<Record<AnalysisId, string[]>> = {
  "sbx-swe-compound-sparv-saldolemgram": ["<token>:saldo.complemgram"],
  "sbx-swe-compound-sparv-saldowords": ["<token>:saldo.compwf"],
  "sbx-swe-dependency-stanza-stanzasynt": [
    "<token>:stanza.dephead_ref as dephead",
    "<token>:stanza.deprel",
    "<token>:stanza.ref",
  ],
  "sbx-swe-geotagcontext-sparv": ["<sentence>:geo.geo_context as _geocontext"],
  "sbx-swe-lemgram-sparv-saldo": ["<token>:saldo.lemgram as lex"],
  "sbx-swe-lemmatization-sparv-saldo2": ["<token>:saldo.baseform2 as lemma"],
  "sbx-swe-lexical_classes_text-sparv-blingbring": [
    "<text>:lexical_classes.blingbring",
  ],
  "sbx-swe-lexical_classes_text-sparv-swefn": ["<text>:lexical_classes.swefn"],
  "sbx-swe-lexical_classes_token-sparv-blingbring": [
    "<token>:lexical_classes.blingbring",
  ],
  "sbx-swe-lexical_classes_token-sparv-swefn": [
    "<token>:lexical_classes.swefn",
  ],
  "sbx-swe-msd-stanza-stanzamorph-suc3": ["<token>:stanza.msd"],
  "sbx-swe-msd-stanza-stanzamorph-ufeats": ["<token>:stanza.ufeats"],
  "sbx-swe-namedentity-swener": [
    "swener.ne",
    "swener.ne:swener.name",
    "swener.ne:swener.ex",
    "swener.ne:swener.type",
    "swener.ne:swener.subtype",
  ],
  "sbx-swe-pos-stanza-stanzamorph": ["<token>:stanza.pos"],
  "sbx-swe-readability-sparv-lix": ["<text>:readability.lix"],
  "sbx-swe-readability-sparv-nk": ["<text>:readability.nk"],
  "sbx-swe-readability-sparv-ovix": ["<text>:readability.ovix"],
  "sbx-swe-sense-sparv": ["<token>:wsd.sense"],
  // "sbx-swe-sentence-sparv-storsuc": [""],
  "sbx-swe-sentiment-sparv-sensaldo": [
    "<token>:sensaldo.sentiment_score",
    "<token>:sensaldo.sentiment_label",
  ],
  // "sbx-swe-tokenization-sparv-betterword": [""],
};

/** Inverted annotation mapping: analysis id of each suggested annotation string. */
const annotationAnalyses: Readonly<Record<string, AnalysisId>> =
  Object.fromEntries(
    Object.entries(analysisAnnotations).map(([analysis, annotations]) =>
      annotations.flatMap((annotation) => [annotation, analysis]),
    ),
  );

type AnalysisMetadataResponse = {
  hits: number;
  resource_type: "analyses";
  resources: AnalysisMetadata[];
};

// Manually transcribed from https://github.com/spraakbanken/metadata/blob/main/schema/metadata.json
type AnalysisMetadata = {
  id: AnalysisId;
  name: ByLang;
  description: ByLang;
  short_description: ByLang;
  unlisted?: boolean;
  successors?: string[];
  languages: { code: string; name: ByLang }[];
  analysis_unit?: ByLang;
  in_collections?: string[];
  caveats?: ByLang;
  intended_uses?: ByLang;
  collection?: boolean;
  keywords?: ByLang[];
  task?: string;
};
