import dayjs from 'dayjs'

/* ══════════════════════════════════════════════════════════
   MOCK PATIENT DATA
   — fields marked readOnly are pulled from backend
   ══════════════════════════════════════════════════════════ */
export const MOCK_PATIENTS = {
  '1234567890123': {
    /* read-only: patient registry */
    nationalId:         '1234567890123',
    prefix:             'นาย',
    firstName:          'สมชาย',
    lastName:           'ใจดี',
    gender:             'ชาย',
    dateOfBirth:        dayjs('2001-02-28'),
    /* read-only: admission system */
    admissionDate:      dayjs('2025-08-28'),
    admissionTime:      dayjs('2025-08-28 13:14:01'),
    sourceHospitalCode: '00001',
    sourceHospitalName: 'สถาบันประสาทวิทยา',
    /* read-only: monitoring system */
    vsDate:             dayjs('2024-05-20'),
    vsTime:             dayjs('2024-05-20 16:12:00'),
    /* editable: personal */
    hn:                 '',
    phone:              '',
    patientCategory:    undefined,
    patientType:        undefined,
    houseNo:            '',
    moo:                '',
    road:               '',
    subDistrict:        '',
    district:           '',
    province:           '',
    nearbyLocation:     '',
    /* editable: treatment */
    referralDocNo:      '',
    hospitalPhone:      '',
    destHospitalName:   undefined,
    destHospitalCode:   '',
    referralValidity:   undefined,
    treatmentRight:     undefined,
    rightNumber:        '',
    billTo:             undefined,
    referralType:       undefined,
    emergencyLevel:     undefined,
    historyFamily:      '',
    currentHistory:     '',
    labResults:         '',
    initialDiagnosis:   '',
    treatmentGiven:     '',
    referralReason:     '',
    otherDetails:       '',
    infectiousStatus:   undefined,
  },
}
