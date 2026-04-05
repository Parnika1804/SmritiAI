// ============================================================
// SMRITI AI — FIR SAMPLES FOR RAG
// 10 real-format Indian FIR templates covering different crime types
// Used by rag.js to upload to Pinecone vector database
// ============================================================

const FIR_SAMPLES = [

// ── SAMPLE 1: ROBBERY ──────────────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Mumbai          Police Station: Dadar         Year: 2024
FIR No: 0142/2024         Date & Time of FIR: 15/03/2024, 22:10 hrs

1. Act & Section: IPC Section 392 (Robbery), Section 34 (Common Intention)
2. Type of Information: Written
3. Day & Date of Occurrence: Wednesday, 15/03/2024
4. Time of Occurrence: 21:30 hrs
5. Information received at PS: 22:00 hrs
6. General Diary Reference: Entry No. 47, Time: 22:05 hrs

7. Details of Known / Suspected / Unknown accused with full particulars:
   Accused 1 (Unknown): Male, approximately 28-32 years old, height 5'8", medium build,
   wheatish complexion, short black hair, wearing black jacket and blue denim jeans,
   distinctive scar on left cheek, fled on red motorcycle bearing number plate MH-12-AB-3456.

8. Reasons for delay in reporting (if any): Victim was in shock and required first aid.

9. Particulars of properties stolen / involved:
   - Cash: Rs. 8,500/-
   - Mobile Phone: Samsung Galaxy S21, IMEI 356789012345678
   - Gold Chain: approx. 10 grams

10. Total value of properties stolen: Rs. 52,000/- (approx.)

11. Inquest Report / U.D. Case No., if any: NA

12. F.I.R. Contents:
The complainant, Shri Ramesh Kumar Sharma, age 34 years, residing at Flat No. 204,
Shivaji Nagar, Dadar, Mumbai, states that on 15/03/2024 at approximately 21:30 hrs,
while he was walking near Dadar Railway Station, an unknown male accused approached
him from behind and snatched his mobile phone and gold chain. When the complainant
resisted, the accused pushed him to the ground, took his wallet containing Rs. 8,500/-
cash and fled the scene on a red motorcycle. The incident occurred near the ATM kiosk
opposite Dadar Station East exit. The complainant could clearly see the accused's face
under the streetlight. The accused had a prominent scar on his left cheek.

Action Taken: Case registered. Spot visited. Search for accused underway.
Investigating Officer: Sub-Inspector Pramod Jadhav, Badge No. MH-04821

Signature of Officer in Charge of Police Station
Name: Inspector Suresh Patil
Date: 15/03/2024`,

// ── SAMPLE 2: ASSAULT ──────────────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Delhi           Police Station: Lajpat Nagar  Year: 2024
FIR No: 0089/2024         Date & Time of FIR: 22/04/2024, 23:45 hrs

1. Act & Section: IPC Section 323 (Voluntarily Causing Hurt), Section 324 (Hurt by Dangerous Weapon)
2. Type of Information: Oral, reduced to writing
3. Day & Date of Occurrence: Monday, 22/04/2024
4. Time of Occurrence: 23:00 hrs
5. Information received at PS: 23:30 hrs
6. General Diary Reference: Entry No. 62, Time: 23:40 hrs

7. Details of Known / Suspected / Unknown accused:
   Accused (Unknown): Male, 30-35 years, height 5'10", heavy build, dark complexion,
   bald head, wearing grey kurta and black trousers, had a knife, escaped on foot
   toward Moolchand Metro Station direction.

8. Reasons for delay in reporting: Victim was taken to AIIMS Emergency first.

9. Particulars of injury sustained:
   - Laceration on left forearm, 4 cm, sutured at AIIMS Emergency
   - Bruising on face and chest

10. F.I.R. Contents:
The complainant, Ms. Priya Verma, age 27 years, residing at D-14, Defence Colony,
New Delhi, states that on 22/04/2024 at approximately 23:00 hrs, she was waiting for
an auto-rickshaw near Lajpat Nagar Metro Station Gate No. 3. An unknown male accused
approached her and demanded her handbag. When she refused, the accused slapped her
and produced a knife, inflicting a cut on her left forearm. A passerby shouted for help
and the accused fled toward Moolchand side. The street was poorly lit but a nearby
shop signboard provided partial illumination allowing the complainant to observe the
accused's features clearly.

Medical Report Attached: Yes, AIIMS OPD Receipt No. 2024/EM/4471
Action Taken: Case registered. Area cordoned. PCR Van notified.
Investigating Officer: SI Kavita Rawat, Badge No. DL-08932`,

// ── SAMPLE 3: VEHICLE THEFT ────────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Pune            Police Station: Shivajinagar  Year: 2024
FIR No: 0201/2024         Date & Time of FIR: 05/05/2024, 09:15 hrs

1. Act & Section: IPC Section 379 (Theft), Section 411 (Dishonestly receiving stolen property)
2. Type of Information: Written complaint
3. Day & Date of Occurrence: Sunday, 05/05/2024
4. Time of Occurrence: Between 02:00 hrs and 07:00 hrs
5. Information received at PS: 09:00 hrs
6. General Diary Reference: Entry No. 12, Time: 09:10 hrs

7. Details of Known / Suspected / Unknown accused:
   Unknown accused, suspected male, tampered with vehicle lock professionally.
   CCTV footage from nearby building shows one male, approximately 25 years,
   slim build, wearing hoodie and cap, face partially concealed.

8. Particulars of stolen vehicle:
   - Vehicle Type: Two Wheeler (Motorcycle)
   - Make & Model: Honda Activa 6G
   - Color: Pearl Sparkling White
   - Registration No.: MH-12-NP-4521
   - Engine No.: JF50E91234567
   - Chassis No.: ME4JF501NL1234567
   - Estimated Value: Rs. 75,000/-

9. F.I.R. Contents:
The complainant, Shri Anil Deshmukh, age 41 years, residing at Flat 3B, Sai Krupa
Apartments, Model Colony, Pune, states that he parked his Honda Activa motorcycle
bearing registration MH-12-NP-4521 in front of his building on the night of 04/05/2024
at approximately 22:30 hrs. On waking on 05/05/2024 at 07:00 hrs he found the vehicle
missing. The parking area has CCTV coverage. The complainant has all original documents
for the vehicle. RC Book and Insurance copies attached.

Action Taken: Case registered. CCTV footage secured. Checkpost notified.
Investigating Officer: HC Santosh Mane, Badge No. MH-09341`,

// ── SAMPLE 4: KIDNAPPING ───────────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Hyderabad       Police Station: Banjara Hills  Year: 2024
FIR No: 0055/2024         Date & Time of FIR: 10/02/2024, 18:30 hrs

1. Act & Section: IPC Section 363 (Kidnapping), Section 365 (Kidnapping with intent to secretly confine)
2. Type of Information: Oral complaint by father
3. Day & Date of Occurrence: Saturday, 10/02/2024
4. Time of Occurrence: 15:30 hrs
5. Information received at PS: 18:00 hrs
6. General Diary Reference: Entry No. 28, Time: 18:20 hrs

7. Details of Known / Suspected / Unknown accused:
   Accused 1 (Unknown): Male, 35-40 years, tall approximately 6'0", fair complexion,
   clean shaven, wearing white shirt and dark trousers, drove a grey Toyota Innova
   with tinted windows, partial plate observed: TS-09-**-2341.
   Accused 2 (Unknown): Male, similar age, heavy build, sat in back of vehicle.

8. Details of Missing Person:
   Name: Rahul Krishnamurthy, Age: 8 years
   Father's Name: Shri V. Krishnamurthy
   School: Delhi Public School, Banjara Hills

9. F.I.R. Contents:
The complainant, Shri Venkat Krishnamurthy, age 42 years, residing at Plot 14,
Road No. 5, Banjara Hills, Hyderabad, states that his son Rahul was returning from
school on 10/02/2024. The school bus dropped him at the colony gate at 15:20 hrs.
A grey Toyota Innova was seen parked near the colony gate. Two unknown male accused
pulled the child into the vehicle and drove away at high speed toward Film Nagar
direction. An eyewitness, the colony watchman, witnessed the incident and noted partial
plate number. The complainant has received no ransom call as of time of filing.

Action Taken: IMMEDIATE. All patrol units alerted. Checkposts on all exit routes.
Child helpline 1098 notified. Senior officers informed.
Investigating Officer: Inspector Ramana Rao, Badge No. TS-03211`,

// ── SAMPLE 5: BURGLARY ─────────────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Bengaluru       Police Station: Koramangala    Year: 2024
FIR No: 0178/2024         Date & Time of FIR: 18/06/2024, 20:00 hrs

1. Act & Section: IPC Section 457 (Lurking house-trespass at night), Section 380 (Theft in dwelling house)
2. Type of Information: Written complaint
3. Day & Date of Occurrence: Tuesday, 18/06/2024
4. Time of Occurrence: Between 10:00 hrs and 19:30 hrs (when complainant was away)
5. Information received at PS: 19:45 hrs
6. General Diary Reference: Entry No. 55, Time: 19:50 hrs

7. Details of Known / Suspected / Unknown accused:
   Unknown accused, professional burglary suspected. Lock picked without damage.
   Neighbours report seeing an unknown male carrying a bag leaving the building
   at approximately 14:00 hrs. Male described as: 30 years, medium height, wearing
   blue uniform resembling courier/delivery person, carrying large backpack.

8. Particulars of stolen property:
   - Laptop: Apple MacBook Pro 14", Serial No. C02XG0JVJHD2, value Rs. 1,80,000/-
   - Cash: Rs. 25,000/-
   - Gold Jewellery: 2 gold bangles (approx. 40 grams), 1 gold necklace (approx. 25 grams)
   - Total estimated value: Rs. 4,25,000/-

9. F.I.R. Contents:
The complainant, Ms. Divya Nair, age 31 years, residing at Flat 502, Prestige Lakeside
Habitat, Koramangala, Bengaluru, states that she left her residence at 10:00 hrs on
18/06/2024 for office. Upon returning at 19:30 hrs she found the main door locked from
outside but upon entering discovered the residence had been ransacked. The master
bedroom almirah was broken open and jewellery box emptied. Her laptop from the study
table and cash from the drawer were also missing. The main door lock showed signs of
professional picking. Building security footage is being examined.

Action Taken: Case registered. Fingerprint Bureau called. CCTV footage seized.
Investigating Officer: SI Deepak Kumar, Badge No. KA-07621`,

// ── SAMPLE 6: MURDER ATTEMPT ───────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Chennai         Police Station: Anna Nagar     Year: 2024
FIR No: 0033/2024         Date & Time of FIR: 02/01/2024, 02:15 hrs

1. Act & Section: IPC Section 307 (Attempt to Murder), Section 326 (Grievous Hurt by Dangerous Weapon)
2. Type of Information: Hospital intimation followed by complainant statement
3. Day & Date of Occurrence: Tuesday, 02/01/2024
4. Time of Occurrence: 01:30 hrs
5. Information received at PS: 01:50 hrs (hospital intimation)
6. General Diary Reference: Entry No. 03, Time: 02:00 hrs

7. Details of Known / Suspected accused:
   Accused (Known): Murugan S/o Selvam, age approximately 38 years, resident of
   6th Cross Street, Anna Nagar West. Height 5'7", dark complexion, stocky build,
   short hair, was wearing lungi and white banian at time of incident. Known to
   complainant — prior property dispute exists.

8. Nature of Injuries:
   - Stab wound: left shoulder, depth 3 cm — treated at Government Kilpauk Medical College
   - Multiple lacerations on both forearms (defensive wounds)

9. F.I.R. Contents:
The complainant, Shri Selvakumar Rajan, age 45 years, residing at 14, 3rd Street,
Anna Nagar West, Chennai, states that on 02/01/2024 at approximately 01:30 hrs, he
heard a noise outside his door. Upon opening the door, the accused Murugan, with whom
he has an ongoing property boundary dispute, attacked him with a knife stabbing him in
the left shoulder. The accused made verbal threats to kill the complainant and his family
before fleeing the scene when neighbours responded to the commotion. The complainant
was rushed to Kilpauk Medical College by neighbours.

Medical Certificate Attached: Yes, Kilpauk MC Cert No. 2024/KMC/0087
Action Taken: Case registered. Accused identified. Arrest team dispatched.
Investigating Officer: Inspector Arjunan K, Badge No. TN-05512`,

// ── SAMPLE 7: SEXUAL OFFENCE ───────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Kolkata         Police Station: Park Street    Year: 2024
FIR No: 0094/2024         Date & Time of FIR: 25/03/2024, 11:00 hrs

1. Act & Section: IPC Section 354 (Assault or criminal force to woman), Section 509 (Word or gesture intended to insult modesty)
2. Type of Information: Written complaint
3. Day & Date of Occurrence: Sunday, 24/03/2024
4. Time of Occurrence: 20:45 hrs
5. Information received at PS: 10:30 hrs (next day)
6. General Diary Reference: Entry No. 41, Time: 10:45 hrs

7. Details of Known / Suspected / Unknown accused:
   Accused (Unknown): Male, 25-30 years, approximately 5'9", slim build, fair complexion,
   well-dressed in formal shirt and trousers, appeared intoxicated, was seen entering a
   black sedan after the incident — partial plate WB-02-**-7823.

8. F.I.R. Contents:
The complainant, name withheld as per legal provision, age 24 years, states that on
24/03/2024 at approximately 20:45 hrs, while she was walking on Park Street near
the Flurys restaurant, an unknown male accused followed her for approximately 200 metres,
made indecent remarks and grabbed her by the arm. She screamed for help and bystanders
intervened. The accused pushed one of the bystanders and fled in a waiting black sedan.
The complainant noted the accused had a distinctive tattoo on his right forearm.
Medical examination conducted at SSKM Hospital.

Action Taken: Case registered. Complainant's statement recorded. Medical examination done.
Woman SI assigned as investigating officer as per guidelines.
Investigating Officer: SI Barnali Ghosh, Badge No. WB-06231`,

// ── SAMPLE 8: CYBERCRIME ───────────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Gurugram        Police Station: Cyber Crime PS Year: 2024
FIR No: 0312/2024         Date & Time of FIR: 12/07/2024, 14:30 hrs

1. Act & Section: IT Act Section 66C (Identity Theft), Section 66D (Cheating by Personation using Computer), IPC Section 420 (Cheating)
2. Type of Information: Written complaint
3. Day & Date of Occurrence: Between 10/07/2024 and 11/07/2024
4. Time of Occurrence: Multiple transactions between 18:00 hrs and 23:00 hrs
5. Information received at PS: 14:00 hrs, 12/07/2024
6. General Diary Reference: Entry No. 88, Time: 14:20 hrs

7. Details of Known / Suspected / Unknown accused:
   Unknown accused operating online. Complainant received calls from number +91-98XXXXXX12.
   Caller posed as bank official. IP addresses and call records requested from service providers.

8. Financial Loss:
   - Amount debited from SBI Account No. XXXX4521: Rs. 1,85,000/-
   - Transaction IDs: SBI/2024/TXN/4521897 and SBI/2024/TXN/4521943
   - Transactions occurred via UPI and NEFT

9. F.I.R. Contents:
The complainant, Shri Harish Mehta, age 52 years, Senior Manager at a private firm,
residing at DLF Phase 3, Gurugram, states that on 10/07/2024 he received a call from
a person claiming to be from SBI Fraud Department. The caller stated his account was
compromised and convinced him to share his OTP for "account protection." Subsequently
Rs. 1,85,000/- was debited in two transactions. The complainant realized the fraud on
11/07/2024 morning and immediately called the bank helpline (1800-11-2211) to block
the account. Bank statement and transaction SMS records attached as evidence.

Action Taken: Case registered. Bank notified for transaction freeze. Cyber cell activated.
Investigating Officer: SI Neha Sharma, Cyber Crime PS, Badge No. HR-09871`,

// ── SAMPLE 9: MISSING PERSON ───────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Jaipur          Police Station: Malviya Nagar  Year: 2024
FIR No: 0167/2024         Date & Time of FIR: 20/05/2024, 16:00 hrs

1. Act & Section: IPC Section 363 (Kidnapping from lawful guardianship) — if foul play established, otherwise Missing Person Report
2. Type of Information: Oral complaint by mother
3. Day & Date of Occurrence: Monday, 20/05/2024
4. Time of Occurrence: Last seen at 13:00 hrs
5. Information received at PS: 15:30 hrs
6. General Diary Reference: Entry No. 34, Time: 15:45 hrs

7. Details of Missing Person:
   Name: Anjali Sharma
   Age: 16 years
   Height: 5'2", slim, wheatish complexion, long black hair, was wearing blue salwar
   kameez and white dupatta when last seen, carrying a pink school bag
   Identifying marks: Small birthmark on right cheek

8. Circumstances of disappearance:
   Last seen near Malviya Nagar Bus Stand. Was expected home by 13:30 hrs after tuition.
   Friends last saw her at the bus stand. One friend reports she was approached by an
   unknown male on a black motorcycle before boarding the bus.

9. F.I.R. Contents:
The complainant, Smt. Sunita Sharma, age 38 years, residing at C-45, Malviya Nagar,
Jaipur, states that her daughter Anjali had gone for tuition classes at 10:00 hrs on
20/05/2024 and was expected to return by 13:30 hrs. When she did not return by 15:00 hrs
the complainant called her classmates who informed that Anjali had left the tuition
center at 12:45 hrs. She was last seen at the Malviya Nagar Bus Stand. The complainant
has tried calling her mobile number which is currently switched off. Anjali has never
done this before and the complainant is deeply concerned.

Action Taken: IMMEDIATE. All patrol units alerted with description. Missing person
notice circulated. Child helpline notified. CCTV footage of bus stand being reviewed.
Investigating Officer: SI Reena Kumari, Badge No. RJ-04421`,

// ── SAMPLE 10: DRUG OFFENCE ────────────────────────────────
`FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

District: Amritsar        Police Station: Civil Lines    Year: 2024
FIR No: 0221/2024         Date & Time of FIR: 08/08/2024, 03:30 hrs

1. Act & Section: NDPS Act Section 21 (Punishment for contravention relating to manufactured drugs), Section 29 (Abetment and criminal conspiracy)
2. Type of Information: Police action on tip-off
3. Day & Date of Occurrence: Thursday, 08/08/2024
4. Time of Occurrence: 02:45 hrs
5. Information received at PS: 02:00 hrs (tip-off received)
6. General Diary Reference: Entry No. 07, Time: 02:10 hrs

7. Details of accused arrested:
   Accused 1: Gurpreet Singh S/o Baldev Singh, age 29 years, residing at Village Fatehgarh,
   Amritsar. Height 5'8", medium build, wheatish complexion, had a beard, was wearing
   blue jeans and red jacket at time of arrest.
   Accused 2: Jaswinder Kaur W/o Gurpreet Singh, age 26 years, same address.

8. Particulars of contraband seized:
   - Heroin (Chitta): 250 grams, estimated street value Rs. 25,00,000/-
   - Cash: Rs. 1,20,000/- (suspected drug money)
   - Mobile Phones: 2 nos. (seized for analysis)
   - Vehicle: Maruti Swift, WB-09-AB-1234, seized

9. F.I.R. Contents:
Acting on credible information received at 02:00 hrs on 08/08/2024, Inspector Gurdeep
Singh led a raiding party to Bypass Road near Verka Milk Plant, Amritsar. The raiding
party intercepted a Maruti Swift vehicle at 02:45 hrs. Upon search of the vehicle in
the presence of independent witnesses, 250 grams of heroin was recovered from a
concealed cavity behind the rear seat. Both accused were present in the vehicle. The
contraband was seized, samples drawn, sealed in presence of witnesses, and sent for
forensic analysis. Accused were informed of grounds of arrest in their language.

Recovery Memo Prepared: Yes     Witnesses Present: Yes (2 independent witnesses)
Seal intact: Yes
Action Taken: Both accused arrested. Vehicle seized. Remand applied for.
Investigating Officer: Inspector Gurdeep Singh, Badge No. PB-02341`

]; // end FIR_SAMPLES