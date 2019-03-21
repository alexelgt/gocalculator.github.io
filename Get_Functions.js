function Get_ATK(Pokemon,IV,Level){
	ATK = ( (Pokemon.Stats[0]+IV[0]) * CP_Multiplier(Level) );
  return ATK
}

function Get_DEF(Pokemon,IV,Level){
	ATK = ( (Pokemon.Stats[1]+IV[1]) * CP_Multiplier(Level) );
  return ATK
}

function Get_HP(Pokemon,IV,Level){
	HP = Math.trunc( (Pokemon.Stats[2]+IV[2]) * CP_Multiplier(Level) );
	if (HP < 10) {
    return 10
  }
  else {
    return HP
  }
}

function Get_CP() {
	/*==== Clear the output ====*/
	$("#Output_CP").html("<hr class='hrseparador'>");

	/*==== Set variables 1/2 ====*/
	var Pokemon_Name_CP = (document.getElementById("Pokemon_Name_CP").value);
	var Pokemon_Name_CP_String = Pokemon_Name_CP;
	Pokemon_Name_CP = Pokemon_Name_CP.toLowerCase();
	Pokemon_Name_CP = Input_Problematic_Pokemon(Pokemon_Name_CP);
	var Pokemon_CP = window[Pokemon_Name_CP];
	var Level = parseFloat(document.getElementById("Level_CP").valueHigh);
	/*===Set variables 1/2 ==*/

	notaneasteregg(Pokemon_Name_CP);

	/*==== Check if inputs are correct ====*/
	if (typeof Pokemon_CP == 'undefined'){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_CP").html($('#Output_CP').html() + "<div id='output_text'>Pokemon incorrecto.</div>");
		}
		else {
			$("#Output_CP").html($('#Output_CP').html() + "<div id='output_text'>Incorrect Pokemon.</div>");
		}
		return;
	}
	/*== Check if inputs are correct ==*/

	/*=== Set variables 2/2 ===*/
	var IV = [parseFloat(document.getElementById("IV_A").value), parseFloat(document.getElementById("IV_D").value), parseFloat(document.getElementById("IV_HP").value)];

	/*==== Get CP and HP ====*/
	var CP = CP_Formula(Pokemon_CP,IV,Level);
	var HP_CP = Get_HP(Pokemon_CP,IV,Level);
	/*== Get CP and HP ==*/

	/*=== Set output ===*/
	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$("#Output_CP").html($('#Output_CP').html() + "<div id='output_text'>Los resultados obtenidos son:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_String + "</h4></div>");

		$("#Output_CP").html($('#Output_CP').html() + "<table><tr><th>" + CP + "</th><th>"+ HP_CP + "</th><th>"+ Math.round((IV[0]+IV[1]+IV[2])/45*100) + "</th></tr><tr><td>PC</td><td>HP</td><td>%IV</td></tr></table>");
	}
	else {
		$("#Output_CP").html($('#Output_CP').html() + "<div id='output_text'>The results obtained are:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_Raid_String + "</h4></div>");

		$("#Output_CP").html($('#Output_CP').html() + "<table><tr><th>" + CP + "</th><th>"+ HP_CP + "</th><th>"+ Math.round((IV[0]+IV[1]+IV[2])/45*100) + "</th></tr><tr><td>CP</td><td>HP</td><td>%IV</td></tr></table>");
	}
}

function Get_Candy_Dust() {
	/*==== Clear the output ====*/
	$("#Output_Candy_Dust").html("<hr class='hrseparador'>");

	/*==== Set variables 1/2 ====*/
	var Pokemon_Name_Candy_Dust = (document.getElementById("Pokemon_Name_CP").value);
	var Pokemon_Name_Candy_Dust_String = Pokemon_Name_Candy_Dust;
	Pokemon_Name_Candy_Dust = Pokemon_Name_Candy_Dust.toLowerCase();
	Pokemon_Name_Candy_Dust = Input_Problematic_Pokemon(Pokemon_Name_Candy_Dust);
	var Pokemon_Candy_Dust = window[Pokemon_Name_Candy_Dust];
	var Level_Max_Candy_Dust = parseFloat(document.getElementById("Level").valueHigh);
	var Level_Min_Candy_Dust = parseFloat(document.getElementById("Level").valueLow);
	/*===Set variables 1/2 ==*/

	notaneasteregg(Pokemon_Name_Candy_Dust);

	/*=== Set variables 2/2 ===*/
	var IV = [parseFloat(document.getElementById("IV_A").value), parseFloat(document.getElementById("IV_D").value), parseFloat(document.getElementById("IV_HP").value)];

	/*==== Get Dust and Candies ====*/
	var Dust_Cost = - Leveltostardust(Level_Max_Candy_Dust);
	var Candy_Cost = - Leveltocandy(Level_Max_Candy_Dust);

	for (var Level = Level_Min_Candy_Dust; Level <= Level_Max_Candy_Dust; Level+=0.5) {
		Dust_Cost += Leveltostardust(Level);
		Candy_Cost += Leveltocandy(Level);
	}
	/*== Get Dust and Candies ==*/

	/*=== Set output ===*/
	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$("#Output_Candy_Dust").html($('#Output_Candy_Dust').html() + "<div id='output_text'>Los resultados obtenidos son:</div><div id='output_text'>El coste de caramelos es: " + Candy_Cost + "<br>El coste de polvosestelares es: " + Dust_Cost + "</div>");
	}
	else {
		$("#Output_Candy_Dust").html($('#Output_Candy_Dust').html() + "<div id='output_text'>The results obtained are:</div><div id='output_text'>The amount of candies required are: " + Candy_Cost + "<br>The amount of stardusts required are: " + Dust_Cost + "</div>");
	}

	if($("#showall_candy_dust").is(':checked')){

		/*==== Check if inputs are correct ====*/
		if (typeof Pokemon_Candy_Dust == 'undefined'){
			if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
				$("#Output_Candy_Dust").html($('#Output_Candy_Dust').html() + "<div id='output_text'>Pokemon incorrecto.</div>");
			}
			else {
				$("#Output_Candy_Dust").html($('#Output_Candy_Dust').html() + "<div id='output_text'>Incorrect Pokemon.</div>");
			}
			return;
		}
		/*== Check if inputs are correct ==*/

		/*==== Get CP and HP ====*/
			var CP_Max = CP_Formula(Pokemon_Candy_Dust,IV,Level_Max_Candy_Dust);
			var HP_CP_Max = Get_HP(Pokemon_Candy_Dust,IV,Level_Max_Candy_Dust);
			var CP_Min = CP_Formula(Pokemon_Candy_Dust,IV,Level_Min_Candy_Dust);
			var HP_CP_Min = Get_HP(Pokemon_Candy_Dust,IV,Level_Min_Candy_Dust);
			var CP_Difference = CP_Max - CP_Min;
			var HP_Difference = HP_CP_Max - HP_CP_Min;
		/*== Get CP and HP ==*/

		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_Candy_Dust").html($('#Output_Candy_Dust').html() + "<div id='output_text'><h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_Candy_Dust_String + "</h4></div><table><tr><th>" + CP_Max + " (+" + CP_Difference + ")</th><th>" + HP_CP_Max + " (+" + HP_Difference + ")</th><th>" + Math.round((IV[0]+IV[1]+IV[2])/45*100) + "</th></tr><tr><td>PC</td><td>HP</td><td>%IV</td></tr></table>");
		}
		else {
			$("#Output_Candy_Dust").html($('#Output_Candy_Dust').html() + "<div id='output_text'><h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_Candy_Dust_String + "</h4></div><table><tr><th>" + CP_Max + " (+" + CP_Difference + ")</th><th>" + HP_CP_Max + " (+" + HP_Difference + ")</th><th>" + Math.round((IV[0]+IV[1]+IV[2])/45*100) + "</th></tr><tr><td>CP</td><td>HP</td><td>%IV</td></tr></table>");
		}
	}
}

function Get_CP_Raids() {
	/*==== Clear the output ====*/
	$("#Output_CP_Raids").html("<hr class='hrseparador'>");
	$("#Output_CP_Raids_2").html("");
	$("#Output_CP_Raids_3").html("");

	/*==== Set variables 1/2 ====*/
	var Pokemon_Name_CP_Raid = (document.getElementById("Pokemon_Name_CP").value);
	var Pokemon_Name_CP_Raid_String = Pokemon_Name_CP_Raid;
	Pokemon_Name_CP_Raid = Pokemon_Name_CP_Raid.toLowerCase();
	Pokemon_Name_CP_Raid = Input_Problematic_Pokemon(Pokemon_Name_CP_Raid);
	var Pokemon_CP_Raid = window[Pokemon_Name_CP_Raid];
	/*===Set variables 1/2 ==*/

	notaneasteregg(Pokemon_Name_CP);

	/*==== Check if inputs are correct ====*/
	if (typeof Pokemon_CP_Raid == 'undefined'){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_CP_Raids").html($('#Output_CP_Raids').html() + "<div id='output_text'>Pokemon incorrecto.</div>");
		}
		else {
			$("#Output_CP_Raids").html($('#Output_CP_Raids').html() + "<div id='output_text'>Incorrect Pokemon.</div>");
		}
		return;
	}
	/*== Check if inputs are correct ==*/

	/*=== Set output ===*/
	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$("#Output_CP_Raids").html($('#Output_CP_Raids').html() + "<div id='output_text'>Los resultados obtenidos son:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_Raid_String + "</h4></div>");
	}
	else {
		$("#Output_CP_Raids").html($('#Output_CP_Raids').html() + "<div id='output_text'>The results obtained are:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_Raid_String + "</h4></div>");
	}

	var Level_Raids;

	if($("#level_15").is(':checked')) {
		Level_Raids = 15;
	}
	else {
		Level_Raids = 25;
	}

	$( "#Output_CP_Raids_2" ).append( "<tr><th>15</th><th>15</th><th>15</th><th>" + CP_Formula(Pokemon_CP_Raid,[15, 15, 15],20) + "</th><th>" + CP_Formula(Pokemon_CP_Raid,[15, 15, 15],Level_Raids) + "</th><th>100</th></tr>" );

	if($("#showall_raids").is(':checked')) {
		for(var IV_Total=44; IV_Total>=31; IV_Total--) {
			for(var IV_A=15; IV_A>=10; IV_A--) {
				for(var IV_D=15; IV_D>=10; IV_D--) {
					for(var IV_HP=15; IV_HP>=10; IV_HP--) {

						if (IV_Total == IV_A + IV_D + IV_HP) {
							$( "#Output_CP_Raids_2" ).append( "<tr><th>" + IV_A + "</th><th>"+ IV_D + "</th><th>" + IV_HP + "</th><th>" + CP_Formula(Pokemon_CP_Raid,[IV_A, IV_D, IV_HP],20) + "</th><th>" + CP_Formula(Pokemon_CP_Raid,[IV_A, IV_D, IV_HP],Level_Raids) + "</th><th>" + Math.round(IV_Total/45*100) + "</th></tr>" );
						}

					}
				}
			}
		}
	}

	$( "#Output_CP_Raids_2" ).append( "<tr><th>10</th><th>10</th><th>10</th><th>" + CP_Formula(Pokemon_CP_Raid,[10, 10, 10],20) + "</th><th>" + CP_Formula(Pokemon_CP_Raid,[10, 10, 10],Level_Raids) + "</th><th>67</th></tr>" );

	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$( "#Output_CP_Raids_2" ).append( "<tr><td>A</td><td>D</td><td>HP</td><td>PC N20</td><td>PC N" + Level_Raids + "</td><td>%IV</td></tr>" );
	}
	else {
		$( "#Output_CP_Raids_2" ).append( "<tr><td>A</td><td>D</td><td>HP</td><td>PC L20</td><td>PC L" + Level_Raids + "</td><td>%IV</td></tr>" );
	}

	if($("#level_15").is(':checked')) {
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_CP_Raids_3").html($('#Output_CP_Raids_3').html() + "<div id='output_text'>Los resultados para nivel 15 son solo para Pokémon obtenidos de investigaciones.</div>");
		}
		else {
			$("#Output_CP_Raids_3").html($('#Output_CP_Raids_3').html() + "<div id='output_text'>The results for level 15 are only for Pokémon obtained from researches.</div>");
		}
	}
	else {
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_CP_Raids_3").html($('#Output_CP_Raids_3').html() + "<div id='output_text'>Los resultados para nivel 25 son solo para Pokémon obtenidos de raids.</div>");
		}
		else {
			$("#Output_CP_Raids_3").html($('#Output_CP_Raids_3').html() + "<div id='output_text'>The results for level 25 are only for Pokémon obtained from raids.</div>");
		}
	}

}

function Get_CP_Wild() {
	/*==== Clear the output ====*/
	$("#Output_CP_Wild").html("<hr class='hrseparador'>");
	$("#Output_CP_Wild_2").html("");

	/*==== Set variables 1/2 ====*/
	var Pokemon_Name_CP_Wild = (document.getElementById("Pokemon_Name_CP").value);
	var Pokemon_Name_CP_Wild_String = Pokemon_Name_CP_Wild;
	Pokemon_Name_CP_Wild = Pokemon_Name_CP_Wild.toLowerCase();
	Pokemon_Name_CP_Wild = Input_Problematic_Pokemon(Pokemon_Name_CP_Wild);
	var Pokemon_CP_Wild = window[Pokemon_Name_CP_Wild];
	/*===Set variables 1/2 ==*/

	notaneasteregg(Pokemon_Name_CP);

	/*==== Check if inputs are correct ====*/
	if (typeof Pokemon_CP_Wild == 'undefined'){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_CP_Wild").html($('#Output_CP_Wild').html() + "<div id='output_text'>Pokemon incorrecto.</div>");
		}
		else {
			$("#Output_CP_Wild").html($('#Output_CP_Wild').html() + "<div id='output_text'>Incorrect Pokemon.</div>");
		}
		return;
	}
	/*== Check if inputs are correct ==*/

	/*=== Set output ===*/
	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$("#Output_CP_Wild").html($('#Output_CP_Wild').html() + "<div id='output_text'>Los resultados obtenidos son:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_Wild_String + "</h4></div>");
	}
	else {
		$("#Output_CP_Wild").html($('#Output_CP_Wild').html() + "<div id='output_text'>The results obtained are:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_Wild_String + "</h4></div>");
	}

	if($("#showall_wild").is(':checked')) {
		for(var Level=35; Level>=1; Level--) {
			$( "#Output_CP_Wild_2" ).append( "<tr><th>" + CP_Formula(Pokemon_CP_Wild,[15, 15, 15],Level) + "</th><th>" + Get_HP(Pokemon_CP_Wild,[15, 15, 15],Level) + "</th><th>" + Level + " (" + Leveltostardust(Level) + ")</th></tr>" );
		}
	}
	else {
		$( "#Output_CP_Wild_2" ).append( "<tr><th>" + CP_Formula(Pokemon_CP_Wild,[15, 15, 15],35) + "</th><th>" + Get_HP(Pokemon_CP_Wild,[15, 15, 15],35) + "</th><th>35 (8000)</th></tr>" );
		$( "#Output_CP_Wild_2" ).append( "<tr><th>" + CP_Formula(Pokemon_CP_Wild,[15, 15, 15],30) + "</th><th>" + Get_HP(Pokemon_CP_Wild,[15, 15, 15],30) + "</th><th>30 (5000)</th></tr>" );
	}

	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$( "#Output_CP_Wild_2" ).append( "<tr><td>PC</td><td>HP</td><td>Nivel</td></tr>" );
	}
	else {
		$( "#Output_CP_Wild_2" ).append( "<tr><td>CP</td><td>HP</td><td>Level</td></tr>" );

	}

}

function Get_CP_Check_Filter(Filter,IV_A,IV_D,IV_HP, max_IV_Atk, max_IV_Def, max_IV_HP, total_IVs) {
	if ( Filter == "100%" || Filter == "0%") {
		if ( (IV_A+IV_D+IV_HP) >= total_IVs) {
			return 1;
		}
	}
	else if ( Filter == "98% 15A" || Filter == "96% 15A" || Filter == "93% 15A" || Filter == "91% 15A" || Filter == "91% 15A 14HP" || Filter == "93% 15A ≥14HP" || Filter == "96% 15A ≥14HP") {
		if ( (IV_A+IV_D+IV_HP) >= total_IVs && IV_A == max_IV_Atk) {
			return 1;
		}
	}
	else if ( Filter == "98%" || Filter == "96%") {
		if ( (IV_A+IV_D+IV_HP) >= total_IVs) {
			return 1;
		}
	}
}





function Stat_values_filter_norepeated(Stat_values_array) {
	var contador_Stat_values_norepeated = 1;
	Stat_values_array_norepeated = [];
	Stat_values_array_norepeated[0] = Stat_values_array[0];

	for (var i = 1; i < Stat_values_array.length; i++) {
		if (Stat_values_array[i] != Stat_values_array[i-1]) {
			Stat_values_array_norepeated[contador_Stat_values_norepeated] = Stat_values_array[i];
			contador_Stat_values_norepeated++;
		}
	}
	return Stat_values_array_norepeated
}







function Get_CP_Search() {
	/*==== Clear the output ====*/
	$("#Output_CP_Search").html("<hr class='hrseparador'>");
	$("#Output_CP_Search_2").html("");

	/*==== Set variables ====*/
	var Pokemon_Name_CP_Search = (document.getElementById("Pokemon_Name_CP").value);
	var Pokemon_Name_CP_Search_String = Pokemon_Name_CP_Search;
	Pokemon_Name_CP_Search = Pokemon_Name_CP_Search.toLowerCase();
	Pokemon_Name_CP_Search = Input_Problematic_Pokemon(Pokemon_Name_CP_Search);
	var Pokemon_CP_Search = window[Pokemon_Name_CP_Search];
	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		var CP_String = "PC";
		var HP_String = "puntos de salud";
	}
	else {
		var CP_String = "CP";
		var HP_String = "hp";
	}
	/*===Set variables ==*/

	notaneasteregg(Pokemon_Name_CP);

	/*==== Check if inputs are correct ====*/
	if (typeof Pokemon_CP_Search == 'undefined'){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_CP_Search").html($('#Output_CP_Search').html() + "<div id='output_text'>Pokemon incorrecto.</div>");
		}
		else {
			$("#Output_CP_Search").html($('#Output_CP_Search').html() + "<div id='output_text'>Incorrect Pokemon.</div>");
		}
		return;
	}
	/*== Check if inputs are correct ==*/

	var total_IVs;
	var min_IV;
	var max_IV;
	var max_IV_Atk;
	var max_IV_Def;
	var max_IV_HP;
	if ( (document.getElementById("CP_Search_IVs_Filter").value) == "100%") {
		total_IVs = 45;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 15;
		min_IV_HP = 15;
	}
	if ( (document.getElementById("CP_Search_IVs_Filter").value) == "0%") {
		total_IVs = 0;
		max_IV = 0;

		min_IV_Atk = 0;
		min_IV_Def = 0;
		min_IV_HP = 0;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "98% 15A") {
		total_IVs = 44;
		max_IV_Atk = 15;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 14;
		min_IV_HP = 14;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "98%") {
		total_IVs = 44;
		max_IV = 15;

		min_IV_Atk = 14;
		min_IV_Def = 14;
		min_IV_HP = 14;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "96% 15A") {
		total_IVs = 43;
		max_IV_Atk = 15;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 13;
		min_IV_HP = 13;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "96%") {
		total_IVs = 43;
		max_IV = 15;

		min_IV_Atk = 13;
		min_IV_Def = 13;
		min_IV_HP = 13;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "96% 15A ≥14HP") {
		total_IVs = 43;
		max_IV_Atk = 15;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 13;
		min_IV_HP = 14;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "93% 15A") {
		total_IVs = 42;
		max_IV_Atk = 15;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 12;
		min_IV_HP = 12;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "93% 15A ≥14HP") {
		total_IVs = 42;
		max_IV_Atk = 15;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 12;
		min_IV_HP = 14;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "91% 15A") {
		total_IVs = 41;
		max_IV_Atk = 15;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 11;
		min_IV_HP = 11;
	}
	else if ( (document.getElementById("CP_Search_IVs_Filter").value) == "91% 15A 14HP") {
		total_IVs = 41;
		max_IV_Atk = 15;
		max_IV = 15;

		min_IV_Atk = 15;
		min_IV_Def = 11;
		min_IV_HP = 14;
	}

	/*==== Set output ====*/
	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$("#Output_CP_Search").html($('#Output_CP_Search').html() + "<div id='output_text'>Los resultados obtenidos son:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_Search_String + "</h4></div>");
	}
	else {
		$("#Output_CP_Search").html($('#Output_CP_Search').html() + "<div id='output_text'>The results obtained are:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_CP_Search_String + "</h4></div>");
	}

	$( "#Output_CP_Search_2" ).append( Pokemon_Name_CP_Search_String.replace('Alola','').replace('alola','').split(' ').join('').replace('Nidoran♀','Nidoran').replace('Nidoran♂','Nidoran') + "&" );

	/*==== Get the search code ====*/
	contador_CP_values = 0;
	var CP_values = [];
	var HP_values = [];
	for(var Level=35; Level>=1; Level -= 1) {

		for (var i = max_IV; i >= min_IV_Atk; i--) {
			for (var j = max_IV; j >= min_IV_Def; j--) {
				for (var k = max_IV; k >= min_IV_HP; k--) {

					var condicion_CP_Search_filter = Get_CP_Check_Filter((document.getElementById("CP_Search_IVs_Filter").value), i, j, k, max_IV_Atk, max_IV_Def, max_IV_HP, total_IVs);

					if ( condicion_CP_Search_filter == 1) {
						CP_values[contador_CP_values] = CP_Formula(Pokemon_CP_Search,[i, j, k],Level);
						HP_values[contador_CP_values] = Get_HP(Pokemon_CP_Search,[i, j, k],Level);
						contador_CP_values++;
					}
				}
			}
		}
	}

	CP_values.sort(function(a, b) {
			return parseFloat(b) - parseFloat(a);
	});

	HP_values.sort(function(a, b) {
			return parseFloat(b) - parseFloat(a);
	});

	CP_values_norepeated = [];
	CP_values_norepeated = Stat_values_filter_norepeated(CP_values);


	HP_values_norepeated = [];
	HP_values_norepeated = Stat_values_filter_norepeated(HP_values);

	var cp_min = CP_values_norepeated[0];
	var cp_max = CP_values_norepeated[0];
	for (var i = 1; i < CP_values_norepeated.length; i++) {

		if (CP_values_norepeated[i-1] - CP_values_norepeated[i] == 1) {
			cp_min = CP_values_norepeated[i];
		}
		if (CP_values_norepeated[i-1] - CP_values_norepeated[i] > 1) {
			if (cp_max == cp_min) {
				$( "#Output_CP_Search_2" ).append( CP_String + cp_min + ",");
			}
			else {
				$( "#Output_CP_Search_2" ).append( CP_String + cp_max + "-" + cp_min + ",");
			}
			cp_min = CP_values_norepeated[i];
			cp_max = CP_values_norepeated[i];
		}
	}
	if (CP_values_norepeated[CP_values_norepeated.length-2] - CP_values_norepeated[CP_values_norepeated.length - 1] > 1) {
		$( "#Output_CP_Search_2" ).append( CP_String + CP_values_norepeated[CP_values_norepeated.length - 1]  + "&");
	}
	else {
		$( "#Output_CP_Search_2" ).append( CP_String + CP_values_norepeated[CP_values_norepeated.length - 2] + "-" + CP_values_norepeated[CP_values_norepeated.length - 1]  + "&");
	}

	var hp_min = HP_values_norepeated[0];
	var hp_max = HP_values_norepeated[0];
	for (var i = 1; i < HP_values_norepeated.length; i++) {

		if (HP_values_norepeated[i-1] - HP_values_norepeated[i] == 1) {
			hp_min = HP_values_norepeated[i];
		}
		if (HP_values_norepeated[i-1] - HP_values_norepeated[i] > 1) {
			if (hp_max == hp_min) {
				$( "#Output_CP_Search_2" ).append( HP_String + hp_min + ",");
			}
			else {
				$( "#Output_CP_Search_2" ).append( HP_String + hp_max + "-" + hp_min + ",");
			}
			hp_min = HP_values_norepeated[i];
			hp_max = HP_values_norepeated[i];
		}
	}
	if (HP_values_norepeated[HP_values_norepeated.length-2] - HP_values_norepeated[HP_values_norepeated.length - 1] > 1) {
		$( "#Output_CP_Search_2" ).append( HP_String + HP_values_norepeated[HP_values_norepeated.length - 1]);
	}
	else {
		$( "#Output_CP_Search_2" ).append( HP_String + HP_values_norepeated[HP_values_norepeated.length - 2] + "-" + HP_values_norepeated[HP_values_norepeated.length - 1]);
	}
	/*== Get the search code ==*/
	/*== Set output ==*/
}

function PVP_Stats_Quality(Atk,Def,HP){
	return Math.trunc( (Atk*Def*HP) /1000.0 ) // this is pvpoke's criteria
	//return Math.trunc( (Atk+Def+HP) *10 )
}

function PVP_Stats_Quality_percentage(Max,Min,Value){
	return (Value - Min) / (Max - Min)
}

function check_filter(filter_value,PVP_Stats_array){
	var rows_checked_filter = 0;
	for (var i = 0; i < PVP_Stats_array.length; i++) {
		if ( PVP_Stats_Quality_percentage(PVP_Stats_array[0][4],PVP_Stats_array[PVP_Stats_array.length - 1][4],PVP_Stats_array[i][4]) > filter_value) {
			rows_checked_filter++;
		}
		else {break;}
	}
	return rows_checked_filter
}

function Get_PVP_Stats(csv_mode) {

	/*==== Set variables 1/2 ====*/
	var code_filter = 0.9; // filter applied to generate the code. In orther to generate useful codes is has to be really high due to false positives
	var display_filter = 0.75; //filter that determines what is considered good quality. Kind of arbitrary value and hence the name

	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		var CP_String = "PC";
		var HP_String = "puntos de salud";
		var Stats_string = "Estadisticas";
		var CSV_search_string = "Codigos de busqueda para calidades superiores a " + code_filter*100.0 + "%";
	}
	else {
		var CP_String = "CP";
		var HP_String = "hp";
		var Stats_string = "Stats";
		var CSV_search_string = "Search code for qualities higher than " + code_filter*100.0 + "%";
	}

	var total_number_pokemon;
	var Pokemon_Set_PVP_CSV;
	var contador_pokemon_validos = 0;
	/*== Set variables 1/2 ==*/

	if (csv_mode == 0) {
		/*==== Clear the output ====*/
		$("#Output_PVP_Stats").html("<hr class='hrseparador'>");
		$("#Output_PVP_Stats_2").html("");
		$("#Output_PVP_Stats_3").html("");
		$("#Output_PVP_Stats_4").html("");
		$("#Output_PVP_Stats_textarea").html("");
		/*== Clear the output ==*/

		/*==== Set variables 2/2 ====*/
		/*==== Set PVP League ====*/
		if (document.getElementById("PVP_Stats_Liga").value == "Super") {League_CP_Limit = 1500;}
		else if (document.getElementById("PVP_Stats_Liga").value == "Ultra") {League_CP_Limit = 2500;}
		else if (document.getElementById("PVP_Stats_Liga").value == "Master") {League_CP_Limit = null;}
		/*== Set PVP League ==*/

		/*==== Set PVP Pokemon ====*/
		Pokemon_Set_PVP_CSV = (document.getElementById("Pokemon_Name_PVP").value);
		total_number_pokemon = 1;
		/*== Set PVP Pokemon ==*/
		/*== Set variables 2/2 ==*/
	}
	else if (csv_mode == 1) {
		/*=== Clear the output ===*/
		$("#Output_PVP_CSV").html("");

		/*==== Set variables 2/2 ====*/
		/*==== Set PVP League ====*/
		if (document.getElementById("PVP_CSV_Liga").value == "Super") {League_CP_Limit = 1500;}
		else if (document.getElementById("PVP_CSV_Liga").value == "Ultra") {League_CP_Limit = 2500;}
		else if (document.getElementById("PVP_CSV_Liga").value == "Master") {League_CP_Limit = null;}
		/*== Set PVP League ==*/

		/*==== Set PVP Pokemon ====*/
		if ((document.getElementById("PVP_CSV_Included_Pokemon").value) == "Manual") {
			if (document.getElementById("Output_PVP_CSV_textarea").value == "") {
				if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
					$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<div id='output_text'>Ningún Pokémon introducido.</div>");
				}
				else {
					$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<div id='output_text'>No Pokémon introduced.</div>");
				}
				return;
			}
			Pokemon_Set_PVP_CSV = document.getElementById("Output_PVP_CSV_textarea").value.split(',');
		}
		else if ((document.getElementById("PVP_CSV_Included_Pokemon").value) == "Tempest") {
			Pokemon_Set_PVP_CSV = ["Lapras","Sealeo","Altaria","Skarmory","Charizard","Tropius","Abomasnow","Whiscash","Lanturn","Quagsire","Marshtomp","Glalie","Froslass", "Sandslash Alola","Mantine","Magneton","Drifblim"];

			for (var i = 0; i < Pokemon_Set_PVP_CSV.length - 1; i++) {
				$( "#Output_PVP_CSV_textarea" ).append( Pokemon_Set_PVP_CSV[i] + "," );
			}
			$( "#Output_PVP_CSV_textarea" ).append( Pokemon_Set_PVP_CSV[Pokemon_Set_PVP_CSV.length - 1]);
		}

		total_number_pokemon = Pokemon_Set_PVP_CSV.length;
		/*== Set PVP Pokemon ==*/
		/*== Set variables 2/2 ==*/

		if (navigator.language = "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<div id='output_text'>Se van a analizar " + total_number_pokemon + " Pokémon:");
		}
		else {
			$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<div id='output_text'>" + total_number_pokemon + " Pokémon are going to be analyzed:");
		}

		/*=== Head of the variable that contains the data of the csv file ===*/
		var csv_data = [["Pokemon", "IVs 1", Stats_string + " 1", CP_String + " 1",  "IVs 2", Stats_string + " 2", CP_String + " 2",  "IVs  3", Stats_string + " 3", CP_String + " 3", CSV_search_string]];
	}

	/*==== Core of the function ====*/
	for (var number_pokemon = 0; number_pokemon < total_number_pokemon; number_pokemon++) {

		if (csv_mode == 0) {
			var Pokemon_Name_PVP_Stats = Pokemon_Set_PVP_CSV;
		}
		else if (csv_mode == 1) {
			var Pokemon_Name_PVP_Stats = Pokemon_Set_PVP_CSV[number_pokemon];
		}

		var Pokemon_Name_PVP_Stats_String = Pokemon_Name_PVP_Stats;
		Pokemon_Name_PVP_Stats = Pokemon_Name_PVP_Stats.toLowerCase();
		Pokemon_Name_PVP_Stats = Input_Problematic_Pokemon(Pokemon_Name_PVP_Stats);
		var Pokemon_PVP_Stats = window[Pokemon_Name_PVP_Stats];

		/*==== Handle if the Pokemon is incorrect ====*/
		if (typeof Pokemon_PVP_Stats == 'undefined'){
			if (csv_mode == 0) {
				if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
					$("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>Pokemon incorrecto.</div>");
				}
				else {
					$("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>Incorrect Pokemon.</div>");
				}
				return;
			}
		}
		/*== Handle if the Pokemon is incorrect ==*/
		/*=== If Pokemon is correct then keep going ===*/
		else {
			contador_pokemon_validos++;

			/*==== Set IVs and best level combinations ====*/
			var Pokemon_Stats_PVP = [];
			var row_Stats_PVP = 0;
			for (var i = 15; i >= 0; i--) {
			  for (var j = 15; j >= 0; j--) {
			    for (var k = 15; k >= 0; k--) {
						if (League_CP_Limit == null) { // In master league the best combination is always level 40 so no need to do a loop
							Pokemon_Stats_PVP[row_Stats_PVP] = [i, j, k, 40, PVP_Stats_Quality(Get_ATK(Pokemon_PVP_Stats,[i,j,k],40),Get_DEF(Pokemon_PVP_Stats,[i,j,k],40),Get_HP(Pokemon_PVP_Stats,[i,j,k],40))]
							row_Stats_PVP++;
						}
						else {
							for (var l = 40; l >= 1; l = l - 0.5) {
								if (CP_Formula(Pokemon_PVP_Stats,[i, j, k],l) <= League_CP_Limit) {
									Pokemon_Stats_PVP[row_Stats_PVP] = [i, j, k, l, PVP_Stats_Quality(Get_ATK(Pokemon_PVP_Stats,[i,j,k],l),Get_DEF(Pokemon_PVP_Stats,[i,j,k],l),Get_HP(Pokemon_PVP_Stats,[i,j,k],l))]
									row_Stats_PVP++;
									break; //combination under CP limit found so stop the loop over l
								}
				      }
						}
			    }
			  }
			}

			/*==== Sort the data ====*/
			/*====Sort by HP ===*/
			Pokemon_Stats_PVP.sort(function(a, b) {
			    return parseFloat(Get_HP(Pokemon_PVP_Stats,[b[0],b[1],b[2]],b[3])) - parseFloat(Get_HP(Pokemon_PVP_Stats,[a[0],a[1],a[2]],a[3]));
			});

			/*====Sort by Quality ===*/
			Pokemon_Stats_PVP.sort(function(a, b) {
			    return parseFloat(b[4]) - parseFloat(a[4]);
			});
			/*== Sort the data ==*/
			/*== Set IVs and best level combinations ==*/


			if (csv_mode == 0) {
				if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
				  $("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>Los resultados obtenidos son:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_PVP_Stats_String + "</h4></div>");
				}
				else {
				  $("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>The results obtained are:<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_PVP_Stats_String + "</h4></div>");
				}
			}

			/*=== Get number of rows that have a quality > code_filter ===*/
			var rows_checked_code_filter = check_filter(code_filter,Pokemon_Stats_PVP);

			if (csv_mode == 0) {

				/*==== Create table with the 3 best qualities ====*/
				var contador_code_filter = 0;
				$( "#Output_PVP_Stats_4" ).append( "<tr><th>" + Pokemon_Stats_PVP[0][0] + "<br>(" + Math.round(Get_ATK(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0],Pokemon_Stats_PVP[0][1],Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]) *10)/10 + ")" + "</th><th>" + Pokemon_Stats_PVP[0][1] + "<br>(" + Math.round(Get_DEF(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0],Pokemon_Stats_PVP[0][1],Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]) *10)/10 + ")" + "</th><th>" + Pokemon_Stats_PVP[0][2] + "<br>(" + Get_HP(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0],Pokemon_Stats_PVP[0][1],Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]) + ")" + "</th><th>" + CP_Formula(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0], Pokemon_Stats_PVP[0][1], Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]) + "<br>(" + Pokemon_Stats_PVP[0][3] + ")</th><th>" + Pokemon_Stats_PVP[0][4] + "<br>(" + Math.round( ( PVP_Stats_Quality_percentage(Pokemon_Stats_PVP[0][4],Pokemon_Stats_PVP[Pokemon_Stats_PVP.length -1][4],Pokemon_Stats_PVP[0][4]) )*100*10)/10 + "%)</th></tr>" );

				for(var i=1; i < Pokemon_Stats_PVP.length; i++) {
					if (Pokemon_Stats_PVP[i][4] != Pokemon_Stats_PVP[i-1][4]) {
						contador_code_filter++;
					}
					if (contador_code_filter < 3) {
						$( "#Output_PVP_Stats_4" ).append( "<tr><th>" + Pokemon_Stats_PVP[i][0] + "<br>(" + Math.round(Get_ATK(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[i][0],Pokemon_Stats_PVP[i][1],Pokemon_Stats_PVP[i][2]],Pokemon_Stats_PVP[i][3]) *10)/10 + ")" + "</th><th>" + Pokemon_Stats_PVP[i][1] + "<br>(" + Math.round(Get_DEF(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[i][0],Pokemon_Stats_PVP[i][1],Pokemon_Stats_PVP[i][2]],Pokemon_Stats_PVP[i][3]) *10)/10 + ")" + "</th><th>" + Pokemon_Stats_PVP[i][2] + "<br>(" + Get_HP(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[i][0],Pokemon_Stats_PVP[i][1],Pokemon_Stats_PVP[i][2]],Pokemon_Stats_PVP[i][3]) + ")" + "</th><th>" + CP_Formula(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[i][0], Pokemon_Stats_PVP[i][1], Pokemon_Stats_PVP[i][2]],Pokemon_Stats_PVP[i][3]) + "<br>(" + Pokemon_Stats_PVP[i][3] + ")</th><th>" + Pokemon_Stats_PVP[i][4] + "<br>(" + Math.round( ( PVP_Stats_Quality_percentage(Pokemon_Stats_PVP[0][4],Pokemon_Stats_PVP[Pokemon_Stats_PVP.length -1][4],Pokemon_Stats_PVP[i][4]) )*100*10)/10 + "%)</th></tr>" );
					}
					else if (contador_code_filter >= 3) {break;}
				}

				if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
				  $( "#Output_PVP_Stats_4" ).append( "<tr><td>A</td><td>D</td><td>HP</td><td>PC<br>(Nivel)</td><td>Calidad</td></tr>" );
				}
				else {
				  $( "#Output_PVP_Stats_4" ).append( "<tr><td>A</td><td>D</td><td>HP</td><td>CP<br>(Level)</td><td>Quality</td></tr>" );
				}
				/*== Create table with the 3 best qualities ==*/

				/*==== Check IVs combination introduced ====*/
				var IV = [parseFloat(document.getElementById("IV_A").value), parseFloat(document.getElementById("IV_D").value), parseFloat(document.getElementById("IV_HP").value)];

				var Stats_PVP_Check;
				for (var i = 0; i < Pokemon_Stats_PVP.length; i++) {
					if (Pokemon_Stats_PVP[i][0] == IV[0] && Pokemon_Stats_PVP[i][1] == IV[1] && Pokemon_Stats_PVP[i][2] == IV[2]) {
						Stats_PVP_Check = [Pokemon_Stats_PVP[i][0],Pokemon_Stats_PVP[i][1],Pokemon_Stats_PVP[i][2],Pokemon_Stats_PVP[i][3],Pokemon_Stats_PVP[i][4]];
						break;
					}
				}

				if ( PVP_Stats_Quality_percentage(Pokemon_Stats_PVP[0][4],Pokemon_Stats_PVP[Pokemon_Stats_PVP.length -1][4],Stats_PVP_Check[4]) > display_filter) {
					if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
						$("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>La combinación de IVs indicada está entre las mejores con una calidad de:</div>");
					}
					else {
						$("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>The combination of IVs indicated is among the best with a quality of:</div>");
					}
				}
				else {
					if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
						$("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>La combinación de IVs indicada NO está entre las mejores. Su calidad es de:</div>");
					}
					else {
						$("#Output_PVP_Stats").html($('#Output_PVP_Stats').html() + "<div id='output_text'>The combination of IVs indicated is NOT among the best. Its quality is:</div>");
					}
				}

				/*==== Create table with IVs combination introduced ====*/
				$( "#Output_PVP_Stats_2" ).append( "<tr><th>" + Stats_PVP_Check[0] + "<br>(" + Math.round(Get_ATK(Pokemon_PVP_Stats,[Stats_PVP_Check[0],Stats_PVP_Check[1],Stats_PVP_Check[2]],Stats_PVP_Check[3]) *10)/10 + ")" + "</th><th>" + Stats_PVP_Check[1] + "<br>(" + Math.round(Get_DEF(Pokemon_PVP_Stats,[Stats_PVP_Check[0],Stats_PVP_Check[1],Stats_PVP_Check[2]],Stats_PVP_Check[3]) *10)/10 + ")" + "</th><th>" + Stats_PVP_Check[2] + "<br>(" + Get_HP(Pokemon_PVP_Stats,[Stats_PVP_Check[0],Stats_PVP_Check[1],Stats_PVP_Check[2]],Stats_PVP_Check[3]) + ")" + "</th><th>" + CP_Formula(Pokemon_PVP_Stats,[Stats_PVP_Check[0], Stats_PVP_Check[1], Stats_PVP_Check[2]],Stats_PVP_Check[3]) + "<br>(" + Stats_PVP_Check[3] + ")</th><th>" + Stats_PVP_Check[4] + "<br>(" + Math.round( ( PVP_Stats_Quality_percentage(Pokemon_Stats_PVP[0][4],Pokemon_Stats_PVP[Pokemon_Stats_PVP.length -1][4],Stats_PVP_Check[4]) )*100*10)/10 + "%)</th></tr>" );

				if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
					$( "#Output_PVP_Stats_2" ).append( "<tr><td>A</td><td>D</td><td>HP</td><td>PC<br>(Nivel)</td><td>Calidad</td></tr>" );
				}
				else {
					$( "#Output_PVP_Stats_2" ).append( "<tr><td>A</td><td>D</td><td>HP</td><td>CP<br>(Level)</td><td>Quality</td></tr>" );
				}
				/*== Create table with IVs combination introduced ==*/
				/*== Check IVs combination introduced ==*/

				/*=== Get number of rows that have a quality > display_filter ===*/
				var rows_checked_display_filter = check_filter(display_filter,Pokemon_Stats_PVP);

				/*==== Tell the user some info about the data ====*/
				percentage_code = Math.round(rows_checked_code_filter / Pokemon_Stats_PVP.length*100 * 1000) / 1000;
				percentage_display = Math.round(rows_checked_display_filter / Pokemon_Stats_PVP.length*100 * 1000) / 1000;
				quality_percentage_low = Math.round( ( PVP_Stats_Quality_percentage(Pokemon_Stats_PVP[0][4],Pokemon_Stats_PVP[Pokemon_Stats_PVP.length -1][4], PVP_Stats_Quality(Get_ATK(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[rows_checked_display_filter][0],Pokemon_Stats_PVP[rows_checked_display_filter][1],Pokemon_Stats_PVP[rows_checked_display_filter][2]],Pokemon_Stats_PVP[rows_checked_display_filter][3]),Get_DEF(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[rows_checked_display_filter][0],Pokemon_Stats_PVP[rows_checked_display_filter][1],Pokemon_Stats_PVP[rows_checked_display_filter][2]],Pokemon_Stats_PVP[rows_checked_display_filter][3]),Get_HP(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[rows_checked_display_filter][0],Pokemon_Stats_PVP[rows_checked_display_filter][1],Pokemon_Stats_PVP[rows_checked_display_filter][2]],Pokemon_Stats_PVP[rows_checked_display_filter][3])))) *100*10)/10;

				if (navigator.language = "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<div id='output_text'>Las combinaciones con una calidad superior al " + display_filter*100.0 + "% se consideran que están entre las mejores. Esto incluye " + rows_checked_display_filter + " combinaciones (" + percentage_display + "%). Rango de calidades: " + Pokemon_Stats_PVP[0][4] +" (100%) - " + Pokemon_Stats_PVP[rows_checked_display_filter][4] + " (" + quality_percentage_low + "%).</div>");
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<div id='output_text'>Para generar el código se han tenido en cuenta las combinaciones con calidades superiores al " + code_filter*100.0 + "% lo cual incluye " + rows_checked_code_filter + " combinaciones (" + percentage_code + "%).</div>");
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<hr class='hrseparador'>");
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<div id='output_text'>Las combinaciones que tienen las 3 mejores calidades son:</div>");
				}
				else {
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<div id='output_text'>The combinations with a quality higher than " + display_filter*100.0 + "% are considered to be among the best. This includes " + rows_checked_display_filter + " combinations (" + percentage_display + "%). Range of qualities: " + Pokemon_Stats_PVP[0][4] +" (100%) - " + Pokemon_Stats_PVP[rows_checked_code_filter][4] + " (" + quality_percentage_low + "%).</div>");
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<div id='output_text'>To generate the code, combinations with qualities higher than " + code_filter*100.0 + "% have been taken into account which includes " + rows_checked_code_filter + " combinations (" + percentage_code + "%).</div>");
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<hr class='hrseparador'>");
					$("#Output_PVP_Stats_3").html($('#Output_PVP_Stats_3').html() + "<div id='output_text'>The combinations with 3 highest qualities are:</div>");
				}
				/*== Tell the user some info about the data ==*/
			}

			/*==== Get the search code ====*/
			var Pokemon_PVP_Stats_Basic_evolution = window[Pokemon_PVP_Stats.Basic_evolution];

			var max_Level = Pokemon_Stats_PVP[0][3];
			var max_CP; var min_CP;
			var max_CP_Basic; var min_CP_Basic;
			var max_HP; var min_HP;
			var max_HP_Basic; var min_HP_Basic;

			/*==== Get maximun level of the combinations ====*/
			if (rows_checked_code_filter != 0) {
				for (var i = 0; i <= rows_checked_code_filter; i++) {
					if (Pokemon_Stats_PVP[i][3] > max_Level) {
						max_Level = Pokemon_Stats_PVP[i][3];
					}
				}
			}
			/*== Get maximun level of the combinations ==*/

			/*==== Get the Pokemon's name ====*/
			// Note: if generate_code_basic is checked the code will be generated taking into account the input Pokemon (for the criterias) but the data of the basic evolution will be put in the search code
			var PVP_Code = "";
			if(($("#generate_code_basic").is(':checked') && csv_mode == 0) || ($("#generate_code_basic_csv").is(':checked') && csv_mode == 1)) {
				PVP_Code += Pokemon_PVP_Stats.Basic_evolution.replace('_alola','').replace('nidoranf','nidoran').replace('nidoranm','nidoran') + "&" ;
			}
			else {
				PVP_Code += Pokemon_Name_PVP_Stats_String.replace('Alola','').replace('alola','').split(' ').join('').replace('Nidoran♀','Nidoran').replace('Nidoran♂','Nidoran') + "&";
			}
			/*== Get the Pokemon's name ==*/


			contador_CP_values_PVP = 0;
			var CP_values_PVP = [];
			var HP_values_PVP = [];

			for(var Level=Math.trunc(max_Level); Level>=1; Level -= 1) {
				for (var i = 0; i <= rows_checked_code_filter; i++) {
					if ((CP_Formula(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[i][0], Pokemon_Stats_PVP[i][1], Pokemon_Stats_PVP[i][2]],Level) <= League_CP_Limit || League_CP_Limit == null)) {
						if(($("#generate_code_basic").is(':checked') && csv_mode == 0) || ($("#generate_code_basic_csv").is(':checked') && csv_mode == 1)) {
							CP_values_PVP[contador_CP_values_PVP] = CP_Formula(Pokemon_PVP_Stats_Basic_evolution,[Pokemon_Stats_PVP[i][0], Pokemon_Stats_PVP[i][1], Pokemon_Stats_PVP[i][2]],Level);
							HP_values_PVP[contador_CP_values_PVP] = Get_HP(Pokemon_PVP_Stats_Basic_evolution,[Pokemon_Stats_PVP[i][0], Pokemon_Stats_PVP[i][1], Pokemon_Stats_PVP[i][2]],Level);
						}
						else {
							CP_values_PVP[contador_CP_values_PVP] = CP_Formula(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[i][0], Pokemon_Stats_PVP[i][1], Pokemon_Stats_PVP[i][2]],Level);
							HP_values_PVP[contador_CP_values_PVP] = Get_HP(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[i][0], Pokemon_Stats_PVP[i][1], Pokemon_Stats_PVP[i][2]],Level);
						}
						contador_CP_values_PVP++;
					}
				}
			}

			CP_values_PVP.sort(function(a, b) {
			    return parseFloat(b) - parseFloat(a);
			});

			HP_values_PVP.sort(function(a, b) {
			    return parseFloat(b) - parseFloat(a);
			});

			CP_values_PVP_norepeated = [];
			CP_values_PVP_norepeated = Stat_values_filter_norepeated(CP_values_PVP);

			HP_values_PVP_norepeated = [];
			HP_values_PVP_norepeated = Stat_values_filter_norepeated(HP_values_PVP);

			var cp_min = CP_values_PVP_norepeated[0];
			var cp_max = CP_values_PVP_norepeated[0];
			for (var i = 1; i < CP_values_PVP_norepeated.length; i++) {

			  if (CP_values_PVP_norepeated[i-1] - CP_values_PVP_norepeated[i] == 1) {
			    cp_min = CP_values_PVP_norepeated[i];
			  }
			  if (CP_values_PVP_norepeated[i-1] - CP_values_PVP_norepeated[i] > 1) {
			    if (cp_max == cp_min) {
			      PVP_Code += ( CP_String + cp_min + ",");
			    }
			    else {
			      PVP_Code += ( CP_String + cp_max + "-" + cp_min + ",");
			    }
			    cp_min = CP_values_PVP_norepeated[i];
			    cp_max = CP_values_PVP_norepeated[i];
			  }
			}
			if (CP_values_PVP_norepeated[CP_values_PVP_norepeated.length-2] - CP_values_PVP_norepeated[CP_values_PVP_norepeated.length - 1] > 1) {
			  PVP_Code += ( CP_String + CP_values_PVP_norepeated[CP_values_PVP_norepeated.length - 1]  + "&");
			}
			else {
			  PVP_Code += ( CP_String + CP_values_PVP_norepeated[CP_values_PVP_norepeated.length - 2] + "-" + CP_values_PVP_norepeated[CP_values_PVP_norepeated.length - 1]  + "&");
			}

			var hp_min = HP_values_PVP_norepeated[0];
			var hp_max = HP_values_PVP_norepeated[0];
			for (var i = 1; i < HP_values_PVP_norepeated.length; i++) {

			  if (HP_values_PVP_norepeated[i-1] - HP_values_PVP_norepeated[i] == 1) {
			    hp_min = HP_values_PVP_norepeated[i];
			  }
			  if (HP_values_PVP_norepeated[i-1] - HP_values_PVP_norepeated[i] > 1) {
			    if (hp_max == hp_min) {
			      PVP_Code += ( HP_String + hp_min + ",");
			    }
			    else {
			      PVP_Code += ( HP_String + hp_max + "-" + hp_min + ",");
			    }
			    hp_min = HP_values_PVP_norepeated[i];
			    hp_max = HP_values_PVP_norepeated[i];
			  }
			}
			if (HP_values_PVP_norepeated[HP_values_PVP_norepeated.length-2] - HP_values_PVP_norepeated[HP_values_PVP_norepeated.length - 1] > 1) {
			  PVP_Code += ( HP_String + HP_values_PVP_norepeated[HP_values_PVP_norepeated.length - 1]);
			}
			else {
			  PVP_Code += ( HP_String + HP_values_PVP_norepeated[HP_values_PVP_norepeated.length - 2] + "-" + HP_values_PVP_norepeated[HP_values_PVP_norepeated.length - 1]);
			}
			/*== Get the search code ==*/

			if (csv_mode == 0) {
				/*=== Send the search code to textarea so the user can copy it ===*/
				$( "#Output_PVP_Stats_textarea" ).append( PVP_Code );
			}

			if (csv_mode == 1) {
				/*==== Send the search code to the variable that contains the data of the csv file ====*/
				csv_data.push([Pokemon_Name_PVP_Stats_String, Pokemon_Stats_PVP[0][0] + " / " + Pokemon_Stats_PVP[0][1] + " / " + Pokemon_Stats_PVP[0][2],Math.round(Get_ATK(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0],Pokemon_Stats_PVP[0][1],Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]) *10)/10 + " / " + Math.round(Get_DEF(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0],Pokemon_Stats_PVP[0][1],Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]) *10)/10 + " / " + Get_HP(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0],Pokemon_Stats_PVP[0][1],Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]),CP_Formula(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[0][0], Pokemon_Stats_PVP[0][1], Pokemon_Stats_PVP[0][2]],Pokemon_Stats_PVP[0][3]),Pokemon_Stats_PVP[1][0] + " / " + Pokemon_Stats_PVP[1][1] + " / " + Pokemon_Stats_PVP[1][2],Math.round(Get_ATK(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[1][0],Pokemon_Stats_PVP[1][1],Pokemon_Stats_PVP[1][2]],Pokemon_Stats_PVP[1][3]) *10)/10 + " / " + Math.round(Get_DEF(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[1][0],Pokemon_Stats_PVP[1][1],Pokemon_Stats_PVP[1][2]],Pokemon_Stats_PVP[1][3]) *10)/10 + " / " + Get_HP(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[1][0],Pokemon_Stats_PVP[1][1],Pokemon_Stats_PVP[1][2]],Pokemon_Stats_PVP[1][3]),CP_Formula(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[1][0], Pokemon_Stats_PVP[1][1], Pokemon_Stats_PVP[1][2]],Pokemon_Stats_PVP[1][3]),Pokemon_Stats_PVP[2][0] + " / " + Pokemon_Stats_PVP[2][1] + " / " + Pokemon_Stats_PVP[2][2],Math.round(Get_ATK(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[2][0],Pokemon_Stats_PVP[2][1],Pokemon_Stats_PVP[2][2]],Pokemon_Stats_PVP[2][3]) *10)/10 + " / " + Math.round(Get_DEF(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[2][0],Pokemon_Stats_PVP[2][1],Pokemon_Stats_PVP[2][2]],Pokemon_Stats_PVP[2][3]) *10)/10 + " / " + Get_HP(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[2][0],Pokemon_Stats_PVP[2][1],Pokemon_Stats_PVP[2][2]],Pokemon_Stats_PVP[2][3]),CP_Formula(Pokemon_PVP_Stats,[Pokemon_Stats_PVP[2][0], Pokemon_Stats_PVP[2][1], Pokemon_Stats_PVP[2][2]],Pokemon_Stats_PVP[2][3]), '"' + PVP_Code + '"']);
				/*== Send the search code to the variable that contains the data of the csv file ==*/

				$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<h4 style='text-transform: capitalize;text-align: center'>" + Pokemon_Name_PVP_Stats_String + "</h4>");
			}
		}

	}
	/*== Core of the function ==*/

	if (csv_mode == 1) {
		/*==== Error if none of the Pokemon are correct ====*/
		if (contador_pokemon_validos == 0) {
			if (navigator.language = "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
				$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<div id='output_text'>Ninguno de los Pokémon analizados son correctos.</div>");
			}
			else {
				$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<div id='output_text'>None of the Pokémon analyzed are correct.</div>");
			}
			return;
		}
		/*== Error if none of the Pokemon are correct ==*/

		/*==== Save data to external file ====*/
		let csvContent = "data:text/csv;charset=utf-8,";
		csv_data.forEach(function(rowArray){
		   let csv_data = rowArray.join(",");
		   csvContent += csv_data + "\r\n";
		});

		var file_name_league;
		if (League_CP_Limit == 1500) {
			file_name_league= "super";
		}
		else if (League_CP_Limit == 2500) {
			file_name_league= "ultra";
		}
		else if (League_CP_Limit == null) {
			file_name_league= "master";
		}

		var file_name_includedpokemon;
		if ((document.getElementById("PVP_CSV_Included_Pokemon").value) == "Manual") {
			file_name_includedpokemon= "custom";
		}
		else if ((document.getElementById("PVP_CSV_Included_Pokemon").value) == "Tempest") {
			file_name_includedpokemon= "tempest";
		}

		var file_name_basicevols = "";
		if(($("#generate_code_basic_csv").is(':checked'))) {
			file_name_basicevols = "_basicevols";
		}

		var file_name_csv = "pvp_" + file_name_league + "_" + file_name_includedpokemon + file_name_basicevols + "_stats.csv";
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", file_name_csv);
		document.body.appendChild(link); // Required for FF

		link.click();

		if (navigator.language = "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<br>Se han guardado los resultados en el archivo " + file_name_csv + "</div>");
		}
		else {
			$("#Output_PVP_CSV").html($('#Output_PVP_CSV').html() + "<br>The results have been saved in the file " + file_name_csv + "</div>");
		}
		/*== Save data to external file ==*/
	}
}

function Get_IV() {
	$("#Output_IV_1").html("<hr class='hrseparador'>");
	$("#Output_IV_2").html("");
	$("#Output_IV_3").html("");

	var Pokemon_Name_IV = (document.getElementById("Pokemon_Name_IV").value); Pokemon_Name_IV = Pokemon_Name_IV.toLowerCase();
	Pokemon_Name_IV = Input_Problematic_Pokemon(Pokemon_Name_IV);
	var Pokemon_IV = window[Pokemon_Name_IV];

	notaneasteregg(Pokemon_Name_IV);

	var HP = (document.getElementById("HP_IV").value);
	var CP = (document.getElementById("CP_IV").value);

	/*==== Check if inputs are correct 1/3 ====*/
	if (typeof Pokemon_IV == 'undefined'){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>Pokemon incorrecto.</div>");
		}
		else {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>Incorrect Pokemon.</div>");
		}
		return;
	}
	if (!HP){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>HP no establecido.</div>");
		}
		else {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>HP not set.</div>");
		}
		return;
	}
	if (!CP){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>PC no establecido.</div>");
		}
		else {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>CP not set.</div>");
		}
		return;
	}
	/*== Check if inputs are correct 1/3 ==*/

	var Stardust_IV = (document.getElementById("Stardust_IV").value);
	var Level_limits = Stardusttolevel(Stardust_IV);
	var size_Level_limits = Level_limits[1]*2-Level_limits[0]*2+1;

	var k=0;

	var HP_calculated = [];
	for(var i=0; i<size_Level_limits; i++) {
    HP_calculated[i] = new Array(17);
	}

	for (var i = Level_limits[0]*2; i <= Level_limits[1]*2; i++) {
		for (var j = 0; j <= 15; j++) {
			HP_calculated[k][j] = Math.trunc((Pokemon_IV.Stats[2]+j)*CP_Multiplier(i/2));
		}
		HP_calculated[k][16]=i/2;
		k=k+1;
	}

	k=0;
	for (var i = 0; i < size_Level_limits; i++) {
		for (var j = 0; j <= 15; j++) {
			if (HP_calculated[i][j] == HP) {
				k=k+1;
			}
		}
	}

	var number_guess=k;
	var IV_HP_guess = [];
	for(var i=0; i<number_guess; i++) {
    IV_HP_guess[i] = new Array(2);
	}

	k=0;
	for (var i = 0; i < size_Level_limits; i++) {
		for (var j = 0; j <= 15; j++) {
			if (HP_calculated[i][j] == HP) {
				IV_HP_guess[k][0] = HP_calculated[i][16];
				IV_HP_guess[k][1]=j;
				k=k+1;
			}
		}
	}

	var number_matches=0;
	for (var i = 0; i < number_guess; i++) {
		for (var j = 0; j <= 15; j++) {
			for (var k = 0; k <= 15; k++) {
				if ( CP == CP_Formula(Pokemon_IV,[j,k,IV_HP_guess[i][1]],IV_HP_guess[i][0]) ) {
					number_matches = number_matches+1;
				}
			}
		}
	}

	/*==== Check if inputs are correct 2/3 ====*/
	if (number_matches == 0){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>No se ha encontrado combinacion.</div>");
		}
		else {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>No combination found.</div>");
		}
		return;
	}
	/*== Check if inputs are correct 2/3 ==*/

	var matches = [];
	for(var i=0; i<number_matches+1; i++) {
	   matches[i] = new Array(7);
	}

	var l=1;
	for (var i = 0; i < number_guess; i++) {
		for (var j = 0; j <= 15; j++) {
			for (var k = 0; k <= 15; k++) {
				if ( CP == CP_Formula(Pokemon_IV,[j,k,IV_HP_guess[i][1]],IV_HP_guess[i][0]) ) {
					matches[l][0] = IV_HP_guess[i][0];
					matches[l][1] = j;
					matches[l][2] = k;
					matches[l][3] = IV_HP_guess[i][1];
					matches[l][4] = Math.round((matches[l][1]+matches[l][2]+matches[l][3])/45*100);
					matches[l][5] = Math.round((CP - CP_Formula(Pokemon_IV,[0,0,0],IV_HP_guess[i][0]))/(CP_Formula(Pokemon_IV,[15,15,15],IV_HP_guess[i][0]) - CP_Formula(Pokemon_IV,[0,0,0],IV_HP_guess[i][0]))*100);
					matches[l][6] = "show";
					l=l+1;
				}
			}
		}
	}

	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		matches[0][0]="Nivel";
	}
	else {
		matches[0][0]="Level";
	}
	matches[0][1]="A";
	matches[0][2]="D";
	matches[0][3]="HP";
	matches[0][4]="%IV";
	matches[0][5]="%PC";
	matches[0][6]="Filter";

	var hatched = (document.getElementById("hatched").value);

	if($("#hatched").is(':checked')) {
		for (var i = 1; i <= number_matches; i++) {
			if ( (matches[i][1] < 10) || (matches[i][2] < 10) || (matches[i][3] < 10) ) {
					matches[i][6] = "hide";
			}
		}
	}

	if($("#powered").is(':not(:checked)')) {
		for (var i = 1; i <= number_matches; i++) {
			if ( matches[i][0] - Math.floor(matches[i][0]) == 0.5 ) {
					matches[i][6] = "hide";
			}
		}
	}

	var Appraisal_IV_Total = (document.getElementById("Appraisal_IV_Total").value);

	if (Appraisal_IV_Total == "Appraisal_IV_Total_1") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (matches[i][1] + matches[i][2] + matches[i][3] > 22) ) {
					matches[i][6] = "hide";
			}
		}
	}
	else if (Appraisal_IV_Total == "Appraisal_IV_Total_2") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (matches[i][1] + matches[i][2] + matches[i][3] > 29) || (matches[i][1] + matches[i][2] + matches[i][3] < 23) ) {
					matches[i][6] = "hide";
			}
		}
	}
	else if (Appraisal_IV_Total == "Appraisal_IV_Total_3") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (matches[i][1] + matches[i][2] + matches[i][3] > 36) || (matches[i][1] + matches[i][2] + matches[i][3] < 30) ) {
					matches[i][6] = "hide";
			}
		}
	}
	else if (Appraisal_IV_Total == "Appraisal_IV_Total_4") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (matches[i][1] + matches[i][2] + matches[i][3] < 37) ) {
					matches[i][6] = "hide";
			}
		}
	}

	var Max_IV = [];

	for (var i = 1; i <= number_matches; i++) {
			Max_IV[i] = Math.max(matches[i][1],matches[i][2],matches[i][3]);
	}

	if( ($("#Appraisal_A").is(':checked')) || ($("#Appraisal_D").is(':checked')) || ($("#Appraisal_HP").is(':checked')) ) {
		if($("#Appraisal_A").is(':checked')){
			for (var i = 1; i <= number_matches; i++) {
				if( matches[i][1] != Max_IV[i] ){
					matches[i][6] = "hide";
				}
			}
		}

		if($("#Appraisal_D").is(':checked')){
			for (var i = 1; i <= number_matches; i++) {
				if( matches[i][2] != Max_IV[i] ){
					matches[i][6] = "hide";
				}
			}
		}

		if($("#Appraisal_HP").is(':checked')){
			for (var i = 1; i <= number_matches; i++) {
				if( matches[i][3] != Max_IV[i] ){
					matches[i][6] = "hide";
				}
			}
		}

		if($("#Appraisal_A").is(':not(:checked)')){
			for (var i = 1; i <= number_matches; i++) {
				if( matches[i][1] == Max_IV[i]){
					matches[i][6] = "hide";
				}
			}
		}

		if($("#Appraisal_D").is(':not(:checked)')){
			for (var i = 1; i <= number_matches; i++) {
				if( matches[i][2] == Max_IV[i]){
					matches[i][6] = "hide";
				}
			}
		}

		if($("#Appraisal_HP").is(':not(:checked)')){
			for (var i = 1; i <= number_matches; i++) {
				if( matches[i][3] == Max_IV[i] ){
					matches[i][6] = "hide";
				}
			}
		}

	}

	var Appraisal_IV_Higher = (document.getElementById("Appraisal_IV_Higher").value);

	if (Appraisal_IV_Higher == "Appraisal_IV_Higher_1") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (Max_IV[i] > 7) ) {
				matches[i][6] = "hide";
			}
		}
	}
	else if (Appraisal_IV_Higher == "Appraisal_IV_Higher_2") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (Max_IV[i] > 12) || (Max_IV[i] < 8) ) {
				matches[i][6] = "hide";
			}
		}
	}
	else if (Appraisal_IV_Higher == "Appraisal_IV_Higher_3") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (Max_IV[i] > 14) || (Max_IV[i] < 13) ) {
				matches[i][6] = "hide";
			}
		}
	}
	else if (Appraisal_IV_Higher == "Appraisal_IV_Higher_4") {
		for (var i = 1; i <= number_matches; i++) {
			if ( (Max_IV[i] < 15) ) {
				matches[i][6] = "hide";
			}
		}
	}

	/*==== Check if inputs are correct 3/3 ====*/
	var showlist = 0;
	for (var i = 1; i <= number_matches; i++) {
		if ( (matches[i][6] == "show") ) {
			showlist = 1;break;
		}
	}

	if (showlist == 0){
		if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>No se ha encontrado combinacion.</div>");
		}
		else {
			$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>No combination found.</div>");
		}
		return;
	}
	/*== Check if inputs are correct 3/3 ==*/

	if (Pokemon_IV.Evolutions != null) {
		var Pokemon_Evolutions = [];
		for (var i = 0; i < Pokemon_IV.Evolutions.length; i++) {
			Pokemon_Evolutions[i] = window[Pokemon_IV.Evolutions[i]];
		}

		var CP_Evolutions = [];
		for(var i=0; i<number_matches+1; i++) {
		   CP_Evolutions[i] = new Array(Pokemon_IV.Evolutions.length);
		}

		for (var i = 0; i < Pokemon_IV.Evolutions.length; i++) {
			if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
				CP_Evolutions[0][i] = "PC " + Pokemon_IV.Evolutions[i];
			}
			else {
				CP_Evolutions[0][i] = "CP " + Pokemon_IV.Evolutions[i];
			}
		}

		for (var i = 1; i < number_matches+1; i++) {
			for (var j = 0; j < Pokemon_IV.Evolutions.length; j++) {
				CP_Evolutions[i][j] = CP_Formula(Pokemon_Evolutions[j],[matches[i][1],matches[i][2],matches[i][3]],matches[i][0]);
			}
		}
	}

	// mostrar
	if (navigator.language == "es-es" || navigator.language == "es" || navigator.language == "es-ES") {
		$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>Los resultados obtenidos son:</div>");
	}
	else {
		$("#Output_IV_1").html($('#Output_IV_1').html() + "<div id='output_text'>The results obtained are:</div>");
	}

	for (var i = 1; i <= number_matches; i++) {
		if ( matches[i][6] != "hide" ) {
			$( "#Output_IV_2" ).append( "<tr>" );
			for (var j = 0; j < 5; j++) {
				$( "#Output_IV_2" ).append( "<th>" + matches[i][j] + "</th>");
			}
			$( "#Output_IV_2" ).append( "<th id='ultimo'>" + matches[i][5] + "</th>");
		}
		$( "#Output_IV_2" ).append( "</tr>" );
	}

	$( "#Output_IV_2" ).append( "<tr>" );
	for (var j = 0; j < 6; j++) {
		$( "#Output_IV_2" ).append( "<td>" + matches[0][j] + "</td>");
	}
	$( "#Output_IV_2" ).append( "</tr>" );

	if (Pokemon_IV.Evolutions != null ) {

		var Max_CP_Evolutions = [];
		var Min_CP_Evolutions = [];
		var set_number;
		var set_min_number;
		var set_max_number;
		var CP_p_min;
		var CP_p_max;

		for (var i = 0; i < Pokemon_IV.Evolutions.length; i++) {
			for (var j = 1; j <= number_matches; j++) {
				if (matches[j][6] != "hide") {
					Min_CP_Evolutions[i] = CP_Evolutions[j][i];
					Max_CP_Evolutions[i] = CP_Evolutions[j][i];
					set_number = j;
					set_min_number = j;
					set_max_number = j;
					break;
				}
			}

			for (var j = set_number; j <= number_matches; j++) {
				if (CP_Evolutions[j][i] > Max_CP_Evolutions[i] && matches[j][6] != "hide") {
					Max_CP_Evolutions[i] = CP_Evolutions[j][i];
					set_max_number = j;
				}
				if (CP_Evolutions[j][i] < Min_CP_Evolutions[i] && matches[j][6] != "hide") {
					Min_CP_Evolutions[i] = CP_Evolutions[j][i];
					set_min_number = j;
				}
			}
		}

		for (var l = 0; l < Pokemon_IV.Evolutions.length; l++) {
			CP_p_min = Math.round((Min_CP_Evolutions[l] - CP_Formula(window[Pokemon_IV.Evolutions[l]],[0,0,0],matches[set_min_number][0]))/(CP_Formula(window[Pokemon_IV.Evolutions[l]],[15,15,15],matches[set_min_number][0]) - CP_Formula(window[Pokemon_IV.Evolutions[l]],[0,0,0],matches[set_min_number][0]))*100);
			CP_p_max = Math.round((Max_CP_Evolutions[l] - CP_Formula(window[Pokemon_IV.Evolutions[l]],[0,0,0],matches[set_max_number][0]))/(CP_Formula(window[Pokemon_IV.Evolutions[l]],[15,15,15],matches[set_max_number][0]) - CP_Formula(window[Pokemon_IV.Evolutions[l]],[0,0,0],matches[set_max_number][0]))*100);
			if (Min_CP_Evolutions[l] != Max_CP_Evolutions[l]) {
				$( "#Output_IV_3" ).append( "<table><tr><th>" + Min_CP_Evolutions[l] + " (" + CP_p_min + "%)" + " - " + Max_CP_Evolutions[l]+ " (" + CP_p_max + "%)" + "</th></tr><tr><td>" + CP_Evolutions[0][l] + "</td></tr></table>");
			}
			else {
					$( "#Output_IV_3" ).append( "<table><tr><th>" + Min_CP_Evolutions[l] + " (" + CP_p_min + "%)" + "</th></tr><tr><td>" + CP_Evolutions[0][l] + "</td></tr></table>");
			}
		}
	}
}

function damage_PVP(move_attacker,atk_attacker,def_defender,damage_multiplier) {
	return Math.trunc(0.5 * moves_pvp[move_attacker]["Power"] * atk_attacker / def_defender * damage_multiplier) + 1.0
}

function STAB_multiplier(pokemon_element, move_element) {
	var STAB_multiplier_value = 1.0;
	for (var i = 0; i < pokemon_element.length; i++) {
		if (pokemon_element[i] == move_element) {
			STAB_multiplier_value = 1.2;
		}
	}
	return STAB_multiplier_value
}

function effectiveness_multiplier(attacker_attack_element,defender_element) {
	var effectiveness_multiplier_value = 1.0;
	if (attacker_attack_element == "Fire") {
		for (var i = 0; i < defender_element.length; i++) {
			if (defender_element[i] == "Water" || defender_element[i] == "Dragon" || defender_element[i] == "Fire" || defender_element[i] == "Rock") {
				effectiveness_multiplier_value = effectiveness_multiplier_value * 0.625;
			}
			if (defender_element[i] == "Steel" || defender_element[i] == "Bug" || defender_element[i] == "Ice" || defender_element[i] == "Grass") {
				effectiveness_multiplier_value = effectiveness_multiplier_value * 1.6;
			}
		}
	}
	if (attacker_attack_element == "Fairy") {
		for (var i = 0; i < defender_element.length; i++) {
			if (defender_element[i] == "Steel" || defender_element[i] == "Fire" || defender_element[i] == "Poison") {
				effectiveness_multiplier_value = effectiveness_multiplier_value * 0.625;
			}
		}
	}
	if (attacker_attack_element == "Dragon") {
		for (var i = 0; i < defender_element.length; i++) {
			if (defender_element[i] == "Dragon") {
				effectiveness_multiplier_value = effectiveness_multiplier_value * 1.6;
			}
		}
	}
	if (attacker_attack_element == "Water") {
		for (var i = 0; i < defender_element.length; i++) {
			if (defender_element[i] == "Fire" || defender_element[i] == "Rock" || defender_element[i] == "Ground") {
				effectiveness_multiplier_value = effectiveness_multiplier_value * 1.6;
			}
		}
	}
	return effectiveness_multiplier_value
}

function Get_PVP_Simulator() {
	$("#Output_PVP_Simulator").html("<hr class='hrseparador'>");

	/*==== Set variables 1/2 ====*/
	battle_turns = 480;
	var Pokemon_Name_PVP1 = "Sealeo";
	var Pokemon_PVP1 = window[Input_Problematic_Pokemon(Pokemon_Name_PVP1.toLowerCase())];

	// Do something to get IVs and level of the best combination
	var IV_PVP_1 = [15,15,15];
	var Level_1 = 30;
	var Pokemon_PVP1_Stats = [Get_ATK(Pokemon_PVP1,[IV_PVP_1[0],IV_PVP_1[1],IV_PVP_1[2]],Level_1), Get_DEF(Pokemon_PVP1,[IV_PVP_1[0],IV_PVP_1[1],IV_PVP_1[2]],Level_1), Get_HP(Pokemon_PVP1,[IV_PVP_1[0],IV_PVP_1[1],IV_PVP_1[2]],Level_1)];

	var Pokemon_Name_PVP2 = "Charizard";
	var Pokemon_PVP2 = window[Input_Problematic_Pokemon(Pokemon_Name_PVP2.toLowerCase())];
	var IV_PVP_2 = [15,15,15];
	var Level_2 = 20;
	var Pokemon_PVP2_Stats = [Get_ATK(Pokemon_PVP2,[IV_PVP_2[0],IV_PVP_2[1],IV_PVP_2[2]],Level_2), Get_DEF(Pokemon_PVP2,[IV_PVP_2[0],IV_PVP_2[1],IV_PVP_2[2]],Level_2), Get_HP(Pokemon_PVP2,[IV_PVP_2[0],IV_PVP_2[1],IV_PVP_2[2]],Level_2)];
	/*===Set variables 1/2 ==*/

	var damage_multiplier_fast1 = [];
	var damage_fast1 = [];
	var move_turns1 = [];
	var move_fast_energy1 = [];
	var moves_fast1 = Pokemon_PVP1["Fast_moves"];
	//
	var damage_multiplier_charged1 = [];
	var damage_charged1 = [];
	var move_charged_energy1 = [];
	var moves_charged1 = Pokemon_PVP1["Charged_moves"];
	//
	var damage_multiplier_fast2 = [];
	var damage_fast2 = [];
	var move_turns2 = [];
	var move_fast_energy2 = [];
	var moves_fast2 = Pokemon_PVP2["Fast_moves"];
	//
	var damage_multiplier_charged2 = [];
	var damage_charged2 = [];
	var move_charged_energy2 = [];
	var moves_charged2 = Pokemon_PVP2["Charged_moves"];

	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<b>Inputs datos Pokemon</b>");
	for (var i = 0; i < Pokemon_PVP1["Fast_moves"].length; i++) {
		damage_multiplier_fast1[i] = STAB_multiplier(Pokemon_PVP1["Element"], moves_pvp[Pokemon_PVP1["Fast_moves"][i]]["Element"]) * effectiveness_multiplier(moves_pvp[Pokemon_PVP1["Fast_moves"][i]]["Element"],Pokemon_PVP2["Element"]) * 1.3;
		damage_fast1[i] = damage_PVP(Pokemon_PVP1["Fast_moves"][i],Pokemon_PVP1_Stats[0],Pokemon_PVP2_Stats[1],damage_multiplier_fast1[i]);
		move_turns1[i] = moves_pvp[Pokemon_PVP1["Fast_moves"][i]]["Duration"];
		move_fast_energy1[i] = moves_pvp[Pokemon_PVP1["Fast_moves"][i]]["Energy"];
	}
	for (var i = 0; i < Pokemon_PVP1["Charged_moves"].length; i++) {
		damage_multiplier_charged1[i] = STAB_multiplier(Pokemon_PVP1["Element"], moves_pvp[Pokemon_PVP1["Charged_moves"][i]]["Element"]) * effectiveness_multiplier(moves_pvp[Pokemon_PVP1["Charged_moves"][i]]["Element"],Pokemon_PVP2["Element"]) * 1.3;
		damage_charged1[i] = damage_PVP(Pokemon_PVP1["Charged_moves"][i],Pokemon_PVP1_Stats[0],Pokemon_PVP2_Stats[1],damage_multiplier_charged1[i]);
		move_charged_energy1[i] = moves_pvp[Pokemon_PVP1["Charged_moves"][i]]["Energy"];
	}
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>Pokemon 1: " + Pokemon_Name_PVP1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimientos rápidos: " + moves_fast1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Daño rápidos: " + damage_fast1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Duracion: " + move_turns1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Energía rápidos: " + move_fast_energy1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimientos cargados: " + moves_charged1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Daño cargados: " + damage_charged1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Energía cargados: " + move_charged_energy1);


	for (var i = 0; i < Pokemon_PVP2["Fast_moves"].length; i++) {
		damage_multiplier_fast2[i] = STAB_multiplier(Pokemon_PVP2["Element"], moves_pvp[Pokemon_PVP2["Fast_moves"][i]]["Element"]) * effectiveness_multiplier(moves_pvp[Pokemon_PVP2["Fast_moves"][i]]["Element"],Pokemon_PVP1["Element"]) * 1.3;
		damage_fast2[i] = damage_PVP(Pokemon_PVP2["Fast_moves"][i],Pokemon_PVP2_Stats[0],Pokemon_PVP1_Stats[1],damage_multiplier_fast2[i]);
		move_turns2[i] = moves_pvp[Pokemon_PVP2["Fast_moves"][i]]["Duration"];
		move_fast_energy2[i] = moves_pvp[Pokemon_PVP2["Fast_moves"][i]]["Energy"];
	}
	for (var i = 0; i < Pokemon_PVP2["Charged_moves"].length; i++) {
		damage_multiplier_charged2[i] = STAB_multiplier(Pokemon_PVP2["Element"], moves_pvp[Pokemon_PVP2["Charged_moves"][i]]["Element"]) * effectiveness_multiplier(moves_pvp[Pokemon_PVP2["Charged_moves"][i]]["Element"],Pokemon_PVP1["Element"]) * 1.3;
		damage_charged2[i] = damage_PVP(Pokemon_PVP2["Charged_moves"][i],Pokemon_PVP2_Stats[0],Pokemon_PVP1_Stats[1],damage_multiplier_charged2[i]);
		move_charged_energy2[i] = moves_pvp[Pokemon_PVP2["Charged_moves"][i]]["Energy"];
	}
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br><br>Pokemon 2: " + Pokemon_Name_PVP2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimientos rápidos: " + moves_fast2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Daño rápidos: " + damage_fast2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Duracion: " + move_turns2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Energía rápidos: " + move_fast_energy2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimientos cargados: " + moves_charged2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Daño cargados: " + damage_charged2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Energía cargados: " + move_charged_energy2);

	/*==== Configuration of the simulation ====*/
	HP_1 = Pokemon_PVP1_Stats[2];
	HP_2 = Pokemon_PVP2_Stats[2];

	Energy_1 = 0;
	Energy_2 = 0;

	var fast_move1 = 1;
	var fast_move2 = 0;

	var charged1_move1 = 2;
	var charged2_move1 = 1;
	var charged1_move2 = 0;
	var charged2_move2 = 1;

	var shields1 = 1;
	var shields2 = 2;
	/*== Configuration of the simulation ==*/

	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br><br><b>Inputs simulación</b>");

	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>Pokemon 1: " + Pokemon_Name_PVP1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• IVs 1: " + IV_PVP_1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• HP 1: " + HP_1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Energía 1: " + Energy_1);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento rápido 1: " + Pokemon_PVP1["Fast_moves"][fast_move1]);
	if (charged1_move1 == null) {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 1: " + charged1_move1);
	}
	else {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 1: " + Pokemon_PVP1["Charged_moves"][charged1_move1]);
	}
	if (charged2_move1 == null) {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 2: " + charged2_move1);
	}
	else {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 2: " + Pokemon_PVP1["Charged_moves"][charged2_move1]);
	}
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Escudos 1: " + shields1);

	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br><br>Pokemon 2: " + Pokemon_Name_PVP2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• IVs 2: " + IV_PVP_2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• HP 2: " + HP_2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Energía 2: " + Energy_2);
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento rápido 2: " + Pokemon_PVP2["Fast_moves"][fast_move2]);
	if (charged1_move2 == null) {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 1: " + charged1_move2);
	}
	else {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 1: " + Pokemon_PVP2["Charged_moves"][charged1_move2]);
	}
	if (charged2_move2 == null) {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 2: " + charged2_move2);
	}
	else {
		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Movimiento cargado 2: " + Pokemon_PVP2["Charged_moves"][charged2_move2]);
	}
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• Escudos 2: " + shields2);


	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>---------<br><b>Simulacion</b></div>");
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>HP: " + HP_1 + ", " + HP_2 + ", Energía: " + Energy_1 + ", " + Energy_2);

	Move_skipturns1 = 0;
	Move_skipturns2 = 0;

	damage_dealt1 = 0;
	damage_dealt2 = 0;

	old_HP1 = HP_1;
	old_HP2 = HP_2;

	var time = 1.0;
	var time_turn = 0.5;
	var time_charged_move = 7.0;

	var willuse_charged_move1 = 0;
	var willuse_charged_move2 = 0;

	var charged_move2_pending = 0;

	for (var turn = 0; turn < battle_turns; turn++) {

		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>Turno " + turn + "");

		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• HP: " + HP_1 + ", " + HP_2 + ", Energía: " + Energy_1 + ", " + Energy_2);

		//Pokemon 1
		var charged_move_used1 = null;
		var use_charged_move1 = 0;
		var shield_used1 = null;

		//Pokemon 2
		var charged_move_used2 = null;
		var use_charged_move2 = 0;
		var shield_used2 = null;

		/*==== FAST ATTACK 1 ====*/
		if (Move_skipturns1 == 0 && willuse_charged_move1 == 0 && charged_move2_pending == 0) {
			HP_2 -= damage_fast1[fast_move1];
			Energy_1 += move_fast_energy1[fast_move1]; if (Energy_1 > 100) {Energy_1 = 100;}
			Move_skipturns1 = move_turns1[fast_move1];
		}
		/*==== FAST ATTACK 1 ====*/

		/*==== FAST ATTACK 2 ====*/
		if (Move_skipturns2 == 0 && willuse_charged_move2 == 0) {
			HP_1 -= damage_fast2[fast_move2];
			Energy_2 += move_fast_energy2[fast_move2]; if (Energy_2 > 100) {Energy_2 = 100;}
			Move_skipturns2 = move_turns2[fast_move2];
		}
		/*== FAST ATTACK 2 ==*/


		if (Move_skipturns1 == 0 && willuse_charged_move1 == 1) {

			/*==== CHARGED ATTACK 1-1 ====*/
			if (charged1_move1 != null && charged_move_used1 == null) {
				if (Energy_1 >= move_charged_energy1[charged1_move1]) {
					use_charged_move1 = 1;
					willuse_charged_move1 = 0;
					time += time_charged_move;

					$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP1 + " (1) uso " + moves_charged1[charged1_move1]);

					Move_skipturns1 = 0;
					Move_skipturns2 = 0;

					if (shields2 > 0) {
						HP_2 --;
						shields2--;
						shield_used2 = 1;
						$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP2 + " (2) uso un escudo");
					}
					else {
						HP_2 -= damage_charged1[charged1_move1];
					}
					Energy_1 -= move_charged_energy1[charged1_move1];
					charged_move_used1 = moves_charged1[charged1_move1];

				}
			}
			/*== CHARGED ATTACK 1-1 ==*/

			/*==== CHARGED ATTACK 2-1 ====*/
			if ((charged2_move1 != null) && (charged_move_used1 == null)) {
				if (Energy_1 >= move_charged_energy1[charged2_move1]) {
					use_charged_move1 = 1;
					willuse_charged_move1 = 0;
					time += time_charged_move;

					$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP1 + " (1) uso " + moves_charged1[charged2_move1]);

					Move_skipturns1 = 0;
					Move_skipturns2 = 0;

					if (shields2 > 0) {
						HP_2 --;
						shields2--;
						shield_used2 = 1;
						$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP2 + " (2) uso un escudo");
					}
					else {
						HP_2 -= damage_charged1[charged2_move1];
					}
					Energy_1 -= move_charged_energy1[charged2_move1];
					charged_move_used1 = moves_charged1[charged2_move1];
				}
			}
			/*== CHARGED ATTACK 2-1 ==*/
		}

		if (Move_skipturns2 == 0 && willuse_charged_move2 == 1 && use_charged_move1 == 1) {
			$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP2 + " (2) tiene pendiente un cargado");
			charged_move2_pending = 1;
		}



		if (Move_skipturns2 == 0 && willuse_charged_move2 == 1 && use_charged_move1 == 0) {
			charged_move2_pending = 0;

			if (charged1_move2 != null && charged_move_used2 == null) {
			  if (Energy_2 >= move_charged_energy2[charged1_move2]) {
			    use_charged_move2 = 1;
					willuse_charged_move2 = 0;
					time += time_charged_move;

					$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP2 + "(2) uso " + moves_charged2[charged1_move1]);

					Move_skipturns1 = 0;
					Move_skipturns2 = 0;

					if (shields1 > 0) {
						HP_1 --;
						shields1--;
						shield_used1 = 1;
						$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP1 + " (1) uso un escudo");
					}
					else {
						HP_1 -= damage_charged2[charged1_move2];
					}
					Energy_2 -= move_charged_energy2[charged1_move2];
			    charged_move_used2 = moves_charged2[charged1_move2];
			  }
			}

			if (charged2_move2 != null && charged_move_used2 == null) {
			  if (Energy_2 >= move_charged_energy2[charged2_move2]) {
			    use_charged_move2 = 1;
					willuse_charged_move2 = 0;
					time += time_charged_move;

					$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP2 + "(2) uso " + moves_charged2[charged2_move1]);

					Move_skipturns1 = 0;
					Move_skipturns2 = 0;

					if (shields1 > 0) {
						HP_1 --;
						shields1--;
						shield_used1 = 1;
						$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP1 + " (1) uso un escudo");
					}
					else {
						HP_1 -= damage_charged2[charged2_move2];
					}
			    Energy_2 -= move_charged_energy2[charged2_move2];
			    charged_move_used2 = moves_charged2[charged2_move2];
			  }
			}
		}

		if (Move_skipturns1 != 0){
			Move_skipturns1--;
		}
		if (Move_skipturns2 != 0){
			Move_skipturns2--;
		}



		if (HP_1 <= 0) {
			HP_1 = 0;
		}
		if (HP_2 <= 0) {
			HP_2 = 0;
		}








		damage_dealt1 +=  old_HP2 - HP_2;
		damage_dealt2 +=  old_HP1 - HP_1;

		old_HP1 = HP_1;
		old_HP2 = HP_2;

		$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>• HP: " + HP_1 + ", " + HP_2 + ", Energía: " + Energy_1 + ", " + Energy_2);

		if ( (charged1_move1 != null && charged_move_used1 == null && Energy_1 >= move_charged_energy1[charged1_move1] && willuse_charged_move1 == 0 && ((HP_2 - damage_fast1[fast_move1]) > 0)) || ((charged2_move1 != null && charged_move_used1 == null && Energy_1 >= move_charged_energy1[charged2_move1] && willuse_charged_move1 == 0 && (shields2 > 0 || ((HP_1 - damage_fast2[fast_move2]) <= 0))) )) {
			willuse_charged_move1 = 1;
			$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP1 + " (1) puede lanzar un cargado. Turnos de espera " + Move_skipturns1);
		}
		if ( (charged1_move2 != null && charged_move_used2 == null && Energy_2 >= move_charged_energy2[charged1_move2] && willuse_charged_move2 == 0 && ((HP_1 - damage_fast2[fast_move2]) > 0)) || ((charged2_move2 != null && charged_move_used2 == null && Energy_2 >= move_charged_energy2[charged2_move2] && willuse_charged_move2 == 0 && (shields1 > 0 || ((HP_2 - damage_fast1[fast_move1]) <= 0))) )) {
			willuse_charged_move2 = 1;
			$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br>- " + Pokemon_Name_PVP2 + " (2) puede lanzar un cargado. Turnos de espera "  + Move_skipturns2);
		}


		time += time_turn;
		/*==== if one of the Pokemon has fainted then end the battle ====*/
		if (HP_1 == 0 || HP_2 == 0) {
			break;
		}
		/*== if one of the Pokemon has fainted then end the battle ==*/


	}
	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br><br>Turnos simulación: " + turn + " (" + time + " segundos)");
	var battle_rating1 = (500.0 * damage_dealt1 / Pokemon_PVP2_Stats[2]) + (500.0 * HP_1 / Pokemon_PVP1_Stats[2]);
	var battle_rating2 = (500.0 * damage_dealt2 / Pokemon_PVP1_Stats[2]) + (500.0 * HP_2 / Pokemon_PVP2_Stats[2]);

	$("#Output_PVP_Simulator").html($('#Output_PVP_Simulator').html() + "<br><br>Battle rating: " + Math.trunc(battle_rating1) + ", " + Math.trunc(battle_rating2));

}
