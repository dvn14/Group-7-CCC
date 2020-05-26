{
  "_id": "_design/mapper1",
  "language": "javascript",
  "aus_Summary":{
"map":"function (doc) {if(doc.gccsa_code != 'None')emit({City: doc.city, GCCSA_Code:doc.gccsa_code, GCCSA_midpoint:doc.gccsa_midpoint, },{Exercise:doc.exercise,Food:doc.food,Film:doc.film});}}",
"reduce":"_sum"},
"nsw_Summary":{
	"map":"function (doc) {if(doc.sa4_code != 'None')emit({Sa4_Name:doc.sa4_name,Sa4_Code:doc.sa4_code,Sa4_Midpoint:doc.sa4_midpoint}, {Exercise:doc.exercise,Food:doc.food,Film:doc.film});}",
	"reduce":"_sum"},
}
