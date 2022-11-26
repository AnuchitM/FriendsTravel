<%@ Page Title="" Language="C#" MasterPageFile="~/master_page/page_list.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="FriendsTravel.home.index" %>

<asp:Content ID="ContentHead" ContentPlaceHolderID="MainContentHead" runat="server">
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
 <%--   <script src="sweetalert2.all.min.js"></script>
    <script src="sweetalert2.min.js"></script>
    <link rel="stylesheet" href="sweetalert2.min.css">--%>
</asp:Content>
<asp:Content ID="ContentBody" ContentPlaceHolderID="MainContentBody" runat="server">
    
    
                <button type="button" class="btn btn-warning swalDefaultWarning">
                  Launch Warning Toast
                </button>
    <div class="swal2-icon swal2-success">
          <div class="swal2-success-circular-line-left"></div>
          <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
          <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>
          <div class="swal2-success-circular-line-right"></div>
        </div>
    <button class="show-example-btn" data-icon="success" aria-label="Try me! Example: success modal">Try me!</button>


    <script>
    </script>
</asp:Content>
