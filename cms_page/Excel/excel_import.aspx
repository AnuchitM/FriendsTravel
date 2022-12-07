<%@ Page Title="" Language="C#" MasterPageFile="~/master_page/page_list.Master" AutoEventWireup="true" CodeBehind="excel_import.aspx.cs" Inherits="FriendsTravel.Execl.excel_import" %>

<asp:Content ID="ContentHead" ContentPlaceHolderID="MainContentHead" runat="server">



    <style>
        #container {
            height: 800px;
            min-width: 310px;
            /*max-width: 800px;*/
            margin: 0 auto;
            border: 1px solid #4f4f4f;
        }

        .header {
            position: sticky !important;
            top: 0 !important;
        }
    </style>
    <!-- DataTables -->
    <link rel="stylesheet" href="../project_theme/AdminLTE-3.2.0/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
    <!-- Theme style -->

    <script src="../project_theme/AdminLTE-3.2.0/plugins/bs-custom-file-input/bs-custom-file-input.min.js"></script>
</asp:Content>
<asp:Content ID="ContentBody" ContentPlaceHolderID="MainContentBody" runat="server">

    <div class="card card-default">
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <label for="fileUpload">Upload Execl : </label>
                    <div class="custom-file">
                        <asp:FileUpload runat="server" CssClass="custom-file-input" ID="fileUpload" accept=".xlsx, .xlsm, .xltx and .xltm" />
                        <asp:Label ID="lblUpload" runat="server" class="custom-file-label" for="fileUpload"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-md-12 col-lg-12" style="align-self: self-end;">
                    <asp:LinkButton runat="server" ID="btnRead" type="button" OnClientClick="return checkFile()" OnClick="Read_exccl" value="Read" class="btn btn-success pr-4 pl-4" Text="Upload"></asp:LinkButton>
                    <a href="../upload/template/template_upload.xlsx" class="btn btn-info">Download Template</a>
                    <asp:LinkButton runat="server" ID="btnExport" type="button" OnClick="btnExport_Click" OnClientClick="return checkData()" value="Read" class="btn btn-primary pr-4 pl-4" Text="Export"></asp:LinkButton>
                </div>
            </div>
        </div>
    </div>

    <div class="card card-default">
        <div class="card-body">
            <div class="col-md-12 col-lg-4 pb-2">
                <label for="fileUpload">Sheet Name : </label>
                <asp:DropDownList ID="ddlSheet" CssClass="form-control select2" runat="server" OnSelectedIndexChanged="ddlSheet_SelectedIndexChanged" AutoPostBack="true"></asp:DropDownList>
            </div>
            <div class="col-md-12 col-lg-12" style="overflow: auto; max-height: 600px">
                <asp:UpdatePanel ID="UpdatePanel_List" runat="server">
                    <ContentTemplate>
                        <asp:Label ID="lblTotal" runat="server" Text="0" Visible="false"></asp:Label>
                        <table id="tbData" class="table table-bordered table-hover">
                            <thead style="position: sticky; top: 0; background: #fff;">
                                <tr>
                                    <asp:Repeater ID="rptHead" runat="server">
                                        <ItemTemplate>
                                            <th class="header" scope="col"><%# DataBinder.Eval(Container.DataItem, "ColumnName")%></th>
                                        </ItemTemplate>
                                    </asp:Repeater>
                                </tr>
                            </thead>
                            <tbody>
                                <asp:Repeater ID="rptRow" runat="server" OnItemDataBound="rptRow_ItemDataBound">
                                    <ItemTemplate>
                                        <tr>
                                            <asp:Literal ID="ltData" runat="server"></asp:Literal>
                                        </tr>
                                    </ItemTemplate>
                                </asp:Repeater>
                            </tbody>
                        </table>
                    </ContentTemplate>
                </asp:UpdatePanel>
            </div>
        </div>
    </div>


    <!-- DataTables  & Plugins -->
    <script src="../project_theme/AdminLTE-3.2.0/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../project_theme/AdminLTE-3.2.0/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>

    <script>
        $(function () {
            bsCustomFileInput.init();
        });


        function checkFile() {
            if ($('#MainContentBody_lblUpload').text() != '') {
                ShowProgress();
                return true;
            } else {
                alertError('กรุณาเลือกไฟล์ที่อัพโหลด !!!');
                return false;
            }
        }

        function checkData() {
            if ($('#MainContentBody_lblUpload').text() != '') {
                return true;
            } else {
                alertError('ไม่มีข้อมูล !!!');
                return false;
            }
        }

        function setTable() {
            $('#tbData').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": true,
                "responsive": true,
            });
        }

        $(document).ready(function () {

        });


    </script>

</asp:Content>
