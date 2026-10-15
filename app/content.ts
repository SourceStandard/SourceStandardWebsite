export type Section={heading:string;text:string[];bullets?:string[]};
export type ContentPage={eyebrow:string;title:string;intro:string;note:string;sections:Section[];cta?:{label:string;href:string}};
export const content:Record<string,ContentPage>={
  "how-it-works": {
    "eyebrow": "THE RESEARCH PROGRAM",
    "title": "Independent purchases. Evidence you can inspect.",
    "intro": "Check participation, then read the actual sample findings. They answer different questions.",
    "note": "An active member may not have published test results.",
    "sections": [
      {
        "heading": "Participation",
        "text": [
          "A vendor joins by agreeing to program requirements and independent scrutiny. A public directory listing alone does not mean the company participates."
        ]
      },
      {
        "heading": "Annual independent testing",
        "text": [
          "Every participating vendor agrees to independent identity and purity testing within 12 months of joining, and annually thereafter. Source Standard randomly selects and purchases one product without advance notice through regular website orders.",
          "The first event is due no later than 12 months after enrollment. One event is due in each subsequent 12-month membership year. This does not mean testing happens immediately on signup or on a shared calendar-year date.",
          "Source Standard is not the seller. People buy from vendors; Source Standard independently purchases selected samples."
        ]
      },
      {
        "heading": "Identity and analytical purity",
        "text": [
          "An independent laboratory uses methods suited to the product and sample. The published record identifies the sample, lot where available, laboratory, method, and findings. Identity and purity are limited analytical attributes—not a comprehensive safety assessment."
        ]
      },
      {
        "heading": "Findings and status updates",
        "text": [
          "Completed findings include failed and inconclusive outcomes. Read the report and its limitations alongside any follow-up. Membership may be Under review, Suspended, or Removed. Material corrections and confirmatory results supplement the record rather than erase prior evidence."
        ]
      },
      {
        "heading": "Later programs",
        "text": [
          "Manufacturer Greenlisting is a future program, not a current enrollment requirement. Clinical and 503A/503B provider verification is coming soon."
        ]
      }
    ],
    "cta": {
      "href": "/standards",
      "label": "Read methodology & limits"
    }
  },
  "vendors": {
    "eyebrow": "PARTICIPATION",
    "title": "Start with a simple introduction.",
    "intro": "Tell us your company name, website, and how to reach you. We will follow up about participation.",
    "note": "An inquiry does not activate membership.",
    "sections": [
      {
        "heading": "What participation means",
        "text": [
          "Members agree to independent product selection, regular website purchases without advance notice, and public accountability. Membership does not guarantee a passing result."
        ]
      },
      {
        "heading": "What happens next",
        "text": [
          "Submit basic company and contact details. Source Standard follows up to discuss eligibility, documentation, and the applicable agreement. Do not submit confidential supplier documents through a public inquiry."
        ]
      },
      {
        "heading": "Read the public record",
        "text": [
          "Profiles distinguish membership status from actual sample findings. The evidence section clearly identifies when no test results have been published."
        ]
      }
    ],
    "cta": {
      "href": "/apply?program=vendor",
      "label": "Introduce your business"
    }
  },
  "standards": {
    "eyebrow": "METHODOLOGY & LIMITS",
    "title": "Understand the evidence behind a profile.",
    "intro": "A useful testing record connects the purchase, sample, method, and findings.",
    "note": "Findings apply to the analyzed sample and identified lot.",
    "sections": [
      {
        "heading": "Sample acquisition and coverage",
        "text": [
          "Every participating vendor agrees to independent identity and purity testing within 12 months of joining, and annually thereafter. Source Standard randomly selects and purchases one product without advance notice through regular website orders. Membership is separate from completed testing. Findings apply to the analyzed sample and identified lot.",
          "The enrollment date anchors the first 12-month deadline and each later membership year. Purchase timing and product selection remain random. Testing one selected product does not represent the entire catalog."
        ]
      },
      {
        "heading": "What identity and purity show",
        "text": [
          "Identity asks whether the analyzed material matches the stated compound within the method’s capability. Analytical purity describes the sample under the reported method. It is not the mass of peptide in the vial.",
          "Read the laboratory method, sample scope, uncertainty, and limitations. A finding should not be described as passing unless the applicable criteria have been established and documented."
        ]
      },
      {
        "heading": "What is not assessed",
        "text": [
          "Identity and purity testing does not establish human-use safety or regulatory approval. The routine panel does not assess heavy metals, residual solvents, sterility, endotoxins, or labeled peptide quantity."
        ]
      },
      {
        "heading": "Membership and published findings",
        "text": [
          "Verified means the vendor meets Source Standard enrollment requirements and participates in independent identity and purity surveillance. It does not mean an independent test has already happened or that every product or batch passed. Active is the underlying membership state. Under review, Suspended, and Removed are distinct membership states. Enrollment not recorded means current membership has not been documented. None of these replaces the testing history.",
          "Completed events identify the product, lot where known, test date, laboratory, method, actual findings, and approved public report. When no public independent test report is available, the profile says no test results are published. Completed events awaiting public disclosure are identified as pending publication. Report links and sample evidence appear with the company’s actual testing history."
        ]
      },
      {
        "heading": "Clinical directory information",
        "text": [
          "Clinics, 503A pharmacies, and 503B outsourcing facilities have different roles. Listings are informational and do not establish Source Standard verification, licensure, treatment suitability, or regulatory approval. Provider verification is coming soon. Consult the relevant state authority and official FDA sources for current regulatory information."
        ]
      },
      {
        "heading": "Corrections, disputes, and reinstatement",
        "text": [
          "Report a disputed finding with the profile link and supporting evidence. Review considers the sample record, laboratory report, method, and any confirmatory work. Material corrections should explain what changed while preserving the evidence history.",
          "Failed and inconclusive findings require clear interpretation and follow-up. Reinstatement is a separate documented decision; a favorable retest does not silently erase an earlier finding."
        ]
      }
    ],
    "cta": {
      "href": "/standards",
      "label": "Read methodology & limits"
    }
  },
  "about": {
    "eyebrow": "ABOUT",
    "title": "Why Source Standard exists",
    "intro": "A voluntary accountability program for research vendors, with independent sample purchases, public findings, and conditional recognition.",
    "note": "Source Standard is not a peptide seller, laboratory, medical provider, or regulator.",
    "sections": [
      {
        "heading": "Why we exist",
        "text": [
          "Our purpose is to make independent scrutiny visible and understandable. Participating companies agree to public findings and enforceable requirements. A company outside the program is not automatically a bad actor."
        ]
      },
      {
        "heading": "A focused research program",
        "text": [
          "Every participating vendor agrees to one independently purchased identity and purity event within 12 months of enrollment, then annually. Testing history remains separate from membership."
        ]
      },
      {
        "heading": "Independence",
        "text": [
          "Membership does not guarantee a passing result. Commercial relationships must not determine laboratory interpretation, publication, or membership decisions. Relevant conflicts should be disclosed with the affected decision."
        ]
      },
      {
        "heading": "A record people can inspect",
        "text": [
          "The program commits to publishing completed findings, including failed and inconclusive outcomes. Corrections and confirmatory work supplement the history. Membership status and actual sample findings remain separate."
        ]
      },
      {
        "heading": "Distinct roles and future phases",
        "text": [
          "Clinical providers have a separate informational directory. 503A and 503B verification is coming soon. Manufacturer Greenlisting is a future program. Source Standard does not certify products for human or animal use."
        ]
      },
      {
        "heading": "Contact Source Standard",
        "text": [
          "For participation questions, corrections, or concerns, contact info@sourcestandard.org. Include the company name or profile link when asking about a record."
        ]
      }
    ],
    "cta": {
      "label": "Contact Source Standard",
      "href": "/contact"
    }
  },
  "governance": {
    "eyebrow": "INDEPENDENCE",
    "title": "Membership does not guarantee a passing result.",
    "intro": "Evidence and documented review should determine findings and status.",
    "note": "Commercial relationships must not govern test decisions.",
    "sections": [
      {
        "heading": "Independent acquisition",
        "text": [
          "Source Standard controls random sample selection and independently purchases products through regular website orders. A handpicked vendor vial does not satisfy routine surveillance."
        ]
      },
      {
        "heading": "Conflicts and commercial relationships",
        "text": [
          "Commercial referrals, fulfillment arrangements, and other relevant relationships must not determine laboratory interpretation, publication, or membership decisions. Relevant conflicts should be disclosed with the affected public decision."
        ]
      },
      {
        "heading": "Visible accountability",
        "text": [
          "Completed failed and inconclusive findings belong in the public history. Material corrections must explain changes. Review, suspension, removal, and reinstatement are separate documented decisions."
        ]
      },
      {
        "heading": "Raise a concern",
        "text": [
          "Share the profile link, the published claim, and supporting evidence. Keep confidential supplier and patient information out of the initial public inquiry."
        ]
      }
    ],
    "cta": {
      "href": "/report-concern",
      "label": "Report a concern"
    }
  },
  "privacy": {
    "eyebrow": "PRIVACY & DATA HANDLING",
    "title": "Public records. Restricted private information.",
    "intro": "Company identity and approved findings belong in public profiles. Private application contacts and confidential commercial records do not.",
    "note": "Do not put supplier documents or patient information in a general inquiry.",
    "sections": [
      {
        "heading": "Company introductions",
        "text": [
          "Preliminary requests collect company name, website, organization type, contact name, and email for follow-up. Application contacts and administrative notes are not published in directories. Business contact information already made public by the company, or explicitly approved for public display, may appear on its profile."
        ]
      },
      {
        "heading": "Confidential records",
        "text": [
          "Confidential supplier disclosures, invoices, sourcing relationships, and original reports are restricted administrative records. They are excluded from public profiles, search responses, and client assets. Use an arranged private channel for confidential documents."
        ]
      },
      {
        "heading": "Public reports",
        "text": [
          "Reports approved for publication must remove confidential sourcing information and identify material redactions. Findings, methods, and sample information must remain accurately represented."
        ]
      },
      {
        "heading": "Questions and corrections",
        "text": [
          "Contact Source Standard to ask about information handling or request a correction. The general inquiry form prepares an email for you to send; it does not transmit your message automatically."
        ]
      }
    ],
    "cta": {
      "href": "/contact",
      "label": "Contact Source Standard"
    }
  },
  "terms": {
    "eyebrow": "TERMS & LIMITS",
    "title": "Use each record within its scope.",
    "intro": "Directory information, program membership, and sample findings serve different purposes.",
    "note": "No listing, membership, or limited finding certifies human-use safety.",
    "sections": [
      {
        "heading": "Directory information",
        "text": [
          "A listing does not imply enrollment, testing, licensure, or regulatory approval. Confirm current business and regulatory details with authoritative sources."
        ]
      },
      {
        "heading": "Research evidence",
        "text": [
          "Every participating vendor agrees to independent identity and purity testing within 12 months of joining, and annually thereafter. Source Standard randomly selects and purchases one product without advance notice through regular website orders. Membership is separate from completed testing. Findings apply to the analyzed sample and identified lot.",
          "Identity and purity testing does not establish human-use safety or regulatory approval. The routine panel does not assess heavy metals, residual solvents, sterility, endotoxins, or labeled peptide quantity."
        ]
      },
      {
        "heading": "Participation",
        "text": [
          "An application is an introduction. Activation requires a separate enrollment decision and the applicable agreement. Membership does not guarantee favorable findings."
        ]
      },
      {
        "heading": "Corrections and concerns",
        "text": [
          "Read the current profile and evidence history. Report inaccurate information with the profile link and supporting evidence. This informational website does not replace the applicable participation agreement."
        ]
      }
    ],
    "cta": {
      "href": "/report-concern",
      "label": "Request a correction"
    }
  }
};
