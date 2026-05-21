/* ══════════════════════════════════════════════════════════
   REFER STATUS CONFIG — shared by ขาออก and ขาเข้า pages
   cls values are CSS module key strings (use styles[cfg.cls])
   ══════════════════════════════════════════════════════════ */
export const STATUS = {
  sent:          { label: 'ส่งมอบ',                          cls: 'statusWarning' },
  received:      { label: 'รับ',                              cls: 'statusInfo'    },
  returnOk:      { label: 'ส่งกลับสำเร็จ',                   cls: 'statusSuccess' },
  returnRejected:{ label: 'ปฏิเสธการส่งกลับ',                cls: 'statusError'   },
  waitDoctor:    { label: 'รอแพทย์เซ็นเอกสาร',               cls: 'statusWarning' },
  draft:         { label: 'ฉบับร่าง',                        cls: 'statusInfo'    },
  done:          { label: 'เสร็จสิ้น',                       cls: 'statusSuccess' },
  cancelledSrc:  { label: 'ยกเลิกใบส่งตัว\nโดย รพ.ต้นทาง',  cls: 'statusError'   },
  returned:      { label: 'ส่งกลับแล้ว',                     cls: 'statusSuccess' },
  cancelledDest: { label: 'ปฏิเสธใบส่งตัว\nโดย รพ.ปลายทาง', cls: 'statusError'   },
  deceased:      { label: 'เสียชีวิต',                       cls: 'statusError'   },
  other:         { label: 'อื่นๆ',                            cls: 'statusDefault' },
}

/* ══════════════════════════════════════════════════════════
   ICD9CM — mock data (replace with API call)
   ══════════════════════════════════════════════════════════ */
export const ICD9CM_DATA = [
  { code: '0056', name: 'Insertion or replacement of implantable pressure sensor (lead) for intracardiac hemodynamic monitoring' },
  { code: '0070', name: 'Revision of hip replacement, both acetabular and femoral components' },
  { code: '0071', name: 'Revision of hip replacement, acetabular component' },
  { code: '0073', name: 'Revision of hip replacement, acetabular liner and/or femoral head only' },
  { code: '0085', name: 'Resurfacing hip, total, acetabulum and femoral head' },
  { code: '0087', name: 'Resurfacing hip, partial, acetabulum' },
  { code: '0234', name: 'Ventricular shunt to abdominal cavity and organs' },
  { code: '0239', name: 'Other operations to establish drainage of ventricle' },
  { code: '1021', name: 'Biopsy of conjunctiva' },
  { code: '1121', name: 'Scraping of cornea for smear or culture' },
  { code: '1254', name: 'Trabeculotomy ab externo' },
  { code: '1264', name: 'Trabeculectomy ab externo' },
  { code: '4411', name: 'Transabdominal gastroscopy' },
  { code: '4412', name: 'Upper gastrointestinal endoscopy' },
  { code: '8822', name: 'Soft tissue x-ray of face and neck' },
  { code: '8871', name: 'Diagnostic ultrasound of head and neck' },
  { code: '9215', name: 'Nerve block (peripheral)' },
  { code: '9929', name: 'Injection or infusion of other therapeutic or prophylactic substance' },
]

/* ══════════════════════════════════════════════════════════
   ICD10 — mock data (replace with API call)
   ══════════════════════════════════════════════════════════ */
export const ICD10_DATA = [
  { code: 'A000', name: 'Cholera due to Vibrio cholerae 01, biovar cholerae',          related: '-', diagnosis: 'Cholera',                                    detail: '-',           description: 'CHOLERA',            abbreviation: 'A000...'    },
  { code: 'A001', name: 'Cholera due to Vibrio cholerae 01, biovar eltor',             related: '-', diagnosis: 'Cholera',                                    detail: '-',           description: 'CHOLERA',            abbreviation: 'A001...'    },
  { code: 'A009', name: 'Cholera, unspecified',                                        related: '-', diagnosis: 'Cholera',                                    detail: '-',           description: 'CHOLERA',            abbreviation: 'A009...'    },
  { code: 'A065', name: 'Amoebic lung abscess',                                        related: '+', diagnosis: 'Amoebic lung abscess (J99.8*)',              detail: '-',           description: 'AMEBIC, AMEBIASIS', abbreviation: 'A065...'    },
  { code: 'A178', name: 'Other tuberculosis of nervous system',                        related: '+', diagnosis: 'Other tuberculosis of nervous system',       detail: '(TUBERCULOMA, system TUBERCULOUS BRAIN ABSCESS, MENINGOENCEPHALITIS, MYELITIS + G07), POLYNEUROPATHY', description: '-', abbreviation: 'A178...=TB' },
  { code: 'A421', name: 'Abdominal actinomycosis',                                     related: '-', diagnosis: 'Abdominal actinomycosis',                   detail: '-',           description: '-',                  abbreviation: 'A421...'    },
  { code: 'A541', name: 'Gonococcal cystitis and urethritis, unspecified',             related: '-', diagnosis: 'Gonococcal',                                 detail: 'GONORRHEAL',  description: 'GONORRHEA',          abbreviation: 'A541...=GC' },
  { code: 'B050', name: 'Measles complicated by encephalitis',                         related: '+', diagnosis: 'Measles complicated by encephalitis',        detail: '-',           description: 'MEASLES',            abbreviation: 'B050...'    },
  { code: 'G409', name: 'Epilepsy, unspecified',                                       related: '-', diagnosis: 'Epilepsy',                                   detail: '-',           description: 'EPILEPSY',           abbreviation: 'G409...'    },
  { code: 'I639', name: 'Cerebral infarction, unspecified',                            related: '-', diagnosis: 'Cerebral infarction',                       detail: '-',           description: 'STROKE',             abbreviation: 'I639...'    },
  { code: 'I694', name: 'Sequelae of stroke, not specified as haemorrhage or infarction', related: '+', diagnosis: 'Sequelae of stroke',                    detail: '-',           description: 'STROKE SEQ',         abbreviation: 'I694...'    },
  { code: 'G819', name: 'Hemiplegia, unspecified',                                     related: '-', diagnosis: 'Hemiplegia',                                 detail: '-',           description: 'HEMIPLEGIA',         abbreviation: 'G819...'    },
]

/* ══════════════════════════════════════════════════════════
   ICD10 diagnosis priority options
   ══════════════════════════════════════════════════════════ */
export const DIAGNOSIS_PRIORITY_OPTIONS = [
  { value: 'principal',    label: 'Principal Diagnosis' },
  { value: 'comorbidity',  label: 'Comorbidity'         },
  { value: 'complication', label: 'Complication'        },
]

/* ══════════════════════════════════════════════════════════
   Drug allergy options
   ══════════════════════════════════════════════════════════ */
export const ALLERGY_DIAGNOSIS_OPTIONS = [
  { value: 'certain',   label: 'Certain'          },
  { value: 'probable',  label: 'Probable/Likely'   },
  { value: 'possible',  label: 'Possible'          },
  { value: 'unlikely',  label: 'Unlikely'          },
]

export const ALLERGY_SEVERITY_OPTIONS = [
  { value: 'non_serious', label: 'ไม่ร้ายแรง (Non-serious)' },
  { value: 'serious',     label: 'ร้ายแรง (Serious)'        },
  { value: 'fatal',       label: 'เสียชีวิต (Fatal)'         },
]

export const ALLERGY_SYMPTOM_OPTIONS = [
  { value: 'urticaria',   label: 'ผื่นคัน (Urticaria/Rash)'              },
  { value: 'dyspnea',     label: 'หายใจลำบาก (Dyspnea)'                  },
  { value: 'anaphylaxis', label: 'ช็อก (Anaphylaxis)'                    },
  { value: 'nausea',      label: 'คลื่นไส้อาเจียน (Nausea/Vomiting)'     },
  { value: 'angioedema',  label: 'อาการบวม (Angioedema)'                 },
  { value: 'sjs',         label: 'Stevens-Johnson Syndrome (SJS)'        },
  { value: 'other',       label: 'อื่นๆ'                                  },
]

export const ALLERGY_ENCOUNTER_OPTIONS = [
  { value: 'inpatient',  label: 'ผู้ป่วยใน (Inpatient)'   },
  { value: 'outpatient', label: 'ผู้ป่วยนอก (Outpatient)' },
  { value: 'emergency',  label: 'ฉุกเฉิน (Emergency)'     },
  { value: 'other',      label: 'อื่นๆ'                    },
]

export const ALLERGY_SERVICE_UNIT_OPTIONS = [
  { value: 'internal_med', label: 'อายุรกรรม'          },
  { value: 'neurology',    label: 'ประสาทวิทยา'        },
  { value: 'emergency',    label: 'ฉุกเฉิน'             },
  { value: 'icu',          label: 'หน่วยวิกฤต (ICU)'   },
  { value: 'pharmacy',     label: 'เภสัชกรรม'           },
  { value: 'other',        label: 'อื่นๆ'               },
]

/* ══════════════════════════════════════════════════════════
   Anesthesia options
   ══════════════════════════════════════════════════════════ */
export const ANESTHESIA_OPTIONS = [
  { value: 'general',  label: 'General Anesthesia' },
  { value: 'local',    label: 'Local Anesthesia' },
  { value: 'regional', label: 'Regional Anesthesia' },
  { value: 'spinal',   label: 'Spinal Anesthesia' },
  { value: 'others',   label: 'Others' },
]
