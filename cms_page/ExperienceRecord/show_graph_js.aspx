<%@ Page Title="" Language="C#" MasterPageFile="~/master_page/page_list.Master" AutoEventWireup="true" CodeBehind="show_graph_js.aspx.cs" Inherits="FriendsTravel.ExperienceRecord.show_graph_js" %>

<asp:Content ID="ContentHead" ContentPlaceHolderID="MainContentHead" runat="server">



    <style>
        #container {
            height: 800px;
            min-width: 310px;
            /*max-width: 800px;*/
            margin: 0 auto;
            border: 1px solid #4f4f4f;
        }

        /* .loading {
            margin-top: 10em;
            text-align: center;
            color: gray;
        }*/
    </style>
</asp:Content>
<asp:Content ID="ContentBody" ContentPlaceHolderID="MainContentBody" runat="server">

    <div class="card card-default">
        <div class="card-body">
            <div class="row">
                <div class="col-md-12 col-lg-4">
                    <label for="txtActivity">Activity Name : </label>
                    <input id="txtActivity" type="text" class="form-control" maxlength="250" />
                </div>
                <div class="col-md-12 col-lg-4">
                    <label for="ddlProvince">Province : </label>
                    <select id="ddlProvince" class="form-control select2 "></select>
                </div>
                <div class="col-md-12 col-lg-4">
                    <label for="txtPeople">Number (People) : </label>
                    <input id="txtPeople" type="text" onkeypress="return validate_int()" class="form-control" maxlength="5" />
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-md-12 col-lg-12">
                    <label for="txtDetail">Detail : </label>
                    <textarea id="txtDetail" class="form-control" rows="3"></textarea>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-md-12 col-lg-4" style="align-self: self-end;">
                    <input id="btnAdd" type="button" value="Add" onclick="return VerifyAdd()" class="btn btn-success pr-4 pl-4" />
                </div>
            </div>
        </div>
    </div>

    <div class="card card-default">
        <div class="card-body">
            <div class="row" id="showActivity">
            </div>

            <div class="col-md-12 col-lg-4" id="cloneDivActivity" style="display: none">
                <div class="card card-primary collapsed-card">
                    <div class="card-header">
                        <h3 class="card-title" id="cNameActivity"></h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <strong>
                            <span id="cProvince"></span>&nbsp;
                                <span id="cPeople"></span>
                        </strong>
                        <br />
                        <span id="cDetail"></span>
                    </div>
                    <div class="card-footer text-right">
                        <i class="far fa-trash-alt" id="cRemove" style="cursor: pointer;" onclick="removeActivity(this.id)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="p-5 text-center">
        <div id="container"></div>
    </div>



    <script>

        var arrActivity = [];
        var arrDataGraph = [];


        function VerifyAdd() {
            ShowProgress();
            var flagAlert = false;

            if (frmMain) {
                if (VerifyRequireField(txtActivity)) { flagAlert = true; }
                if (VerifyRequireField(txtPeople)) { flagAlert = true; }
                if (VerifyRequireField(txtDetail)) { flagAlert = true; }

                if (VerifyRequireFieldSelect2(ddlProvince)) { flagAlert = true; }

            }
            if (flagAlert) {
                HideProgress();
                alertError('กรุณากรอกข้อมูลให้ครบถ้วน !!!');
                return false;
            }
            else {
                addActivity();
                HideProgress();
                return true;
            }
        }

        function clearSection() {
            $('#txtActivity').val('');
            $('#txtPeople').val('');
            $('#txtDetail').val('');
            setDropdown('../json/province.json', 'ddlProvince', 'name', 'key', true);
        }



        function removeActivity(id) {
            alertConfrim('ต้องการลบใช่หรือไม่ ?', function (confirmed) {
                if (confirmed) {
                    const arrID = id.split("_");
                    var indexDataGraph = -99;
                    arrDataGraph.forEach(function (e, i) {
                        if (arrID[1] == e[0]) {
                            if (e[1] > 1) arrDataGraph[i][1] = Number(e[1]) - 1;
                            else if (e[1] == 1) indexDataGraph = Number(i);
                        };
                    });
                    if (indexDataGraph != -99) {
                        arrDataGraph.splice(indexDataGraph, 1);
                    }

                    $("#c" + arrID[2]).remove();

                    genGraph(arrDataGraph);
                    alertSuccess('Success');
                }
            });
        }

        var cloneID = 0;
        function addActivity() {
            cloneID++;
            var strActivity = $('#txtActivity').val();
            var strPeople = $('#txtPeople').val();
            var strDetail = $('#txtDetail').val();
            var strProvince = $('#select2-ddlProvince-container').text()
            var strprovinceCode = $('#ddlProvince').val();
            strProvince = strprovinceCode == '' ? '' : strProvince;

            var indexDataGraph = -99;
            var countQty = 1;
            arrDataGraph.forEach(function (e, i) {
                if (strprovinceCode == e[0]) {
                    indexDataGraph = i;
                    countQty = e[1] + 1;
                };
            });


            var obj1 = {
                index: cloneID,
                activity: strActivity,
                people: strPeople,
                province: strProvince,
                provinceCoed: strprovinceCode,
                detail: strDetail
            };
            arrActivity.push(obj1);


            if (strprovinceCode != '' && indexDataGraph == -99) {
                var obj2 = [
                    strprovinceCode, countQty
                ];
                arrDataGraph.push(obj2);
            } else if (indexDataGraph != -99) {
                arrDataGraph[indexDataGraph][1] = countQty;
            }

            clearSection();

            var divShowActivity = document.getElementById('showActivity');
            var divClone = ($("#cloneDivActivity").clone())[0];
            var CID = 'c' + cloneID;
            divClone.id = CID;
            divShowActivity.appendChild(divClone);
            $("#" + CID).find('#cNameActivity')[0].innerText = strActivity;
            $("#" + CID).find('#cProvince')[0].innerText = strProvince;
            $("#" + CID).find('#cPeople')[0].innerText = strPeople != '' ? '(' + strPeople + ')' : '';
            $("#" + CID).find('#cDetail')[0].innerText = strDetail;
            $("#" + CID).find('#cRemove')[0].id = 'cRemove_' + strprovinceCode + '_' + cloneID;
            divClone.style.display = "block";

            genGraph(arrDataGraph);
            alertSuccess('Success');
            //showActivity(arrActivity);
        }

        function showActivity(arr) {

        }

        async function genGraph(data) {
            var topology = await fetch(
                '../json/th-all.topo.json'
            ).then(response => response.json());

            //var arrList = topology.objects.default.geometries;
            //var arrProvince = [];
            //arrList.forEach(function (t) {
            //    var strName = t.properties.name;
            //    var strKey = t.properties['hc-key'];
            //    var obj = { name: strName, key: strKey };
            //    arrProvince.push(obj);
            //});
            //console.log(arrProvince);

            //var sortedRolls = arrProvince.sort((r1, r2) => (r1.name > r2.name) ? 1 : (r1.name < r2.name) ? -1 : 0)
            //var myJsonString = JSON.stringify(sortedRolls);
            //debugger;
            //var data = [
            //    ['th-ct', 10],
            //    //['th-4255', 1000],
            //    ['th-pg', 12], ['th-st', 13],
            //    ['th-kr', 14], ['th-sa', 15], ['th-tg', 16], ['th-tt', 17],
            //    ['th-pl', 18], ['th-ps', 19], ['th-kp', 20], ['th-pc', 21],
            //    ['th-sh', 22], ['th-at', 23], ['th-lb', 24], ['th-pa', 25],
            //    ['th-np', 26], ['th-sb', 27], ['th-cn', 28], ['th-bm', 29],
            //    ['th-pt', 30], ['th-no', 31], ['th-sp', 32], ['th-ss', 33],
            //    ['th-sm', 34], ['th-pe', 35], ['th-cc', 36], ['th-nn', 37],
            //    ['th-cb', 38], ['th-br', 39], ['th-kk', 40], ['th-ph', 41],
            //    ['th-kl', 42], ['th-sr', 43], ['th-nr', 44], ['th-si', 45],
            //    ['th-re', 46], ['th-le', 47], ['th-nk', 48], ['th-ac', 49],
            //    ['th-md', 50], ['th-sn', 51], ['th-nw', 52], ['th-pi', 53],
            //    ['th-rn', 54], ['th-nt', 55], ['th-sg', 56], ['th-pr', 57],
            //    ['th-py', 58], ['th-so', 59], ['th-ud', 60], ['th-kn', 61],
            //    ['th-tk', 62], ['th-ut', 63], ['th-ns', 64], ['th-pk', 65],
            //    ['th-ur', 66], ['th-sk', 67], ['th-ry', 68], ['th-cy', 69],
            //    ['th-su', 70], ['th-nf', 71], ['th-bk', 72], ['th-mh', 73],
            //    ['th-pu', 74], ['th-cp', 75], ['th-yl', 76], ['th-cr', 77],
            //    ['th-cm', 78], ['th-ln', 79], ['th-na', 80], ['th-lg', 81],
            //    ['th-pb', 82], ['th-rt', 83], ['th-ys', 84], ['th-ms', 85],
            //    ['th-un', 86], ['th-nb', 87]
            //];

            // Create the chart
            Highcharts.mapChart('container', {
                chart: {
                    map: topology
                },
                credits: {
                    enabled: false
                },
                exporting: { enabled: false },
                title: {
                    text: ''
                },

                subtitle: {
                    //text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/th/th-all.topo.json">Thailand</a>'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'top'
                    }
                },

                colorAxis: {
                    min: 0
                },

                series: [{
                    data: data,
                    name: 'จำนวนครั้ง',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }],
            });

        }


        $(document).ready(function () {
            clearSection();
            genGraph();
        });
    </script>


</asp:Content>
