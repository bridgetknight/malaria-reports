import igv from "https://cdn.jsdelivr.net/npm/igv@2.15.5/dist/igv.esm.min.js"

var token = 'ya29.c.b0Aaekm1I5ahwsQ6wgbhR3pDYxlIgI-mVPbl1we6GItTzCH2FqPDVcHvyh2KmYYrvi56w-F4h4uP0cAj308mAydndhdpFJCnm04j-tySswuRVrYG69GVVHku2chfWxxjw1AAWdWAD3LCVEkE8BEenm7nTmOHx5Xra8gFg1ZQbxWTzTLxvMYnFKjXP3reFdTINenOl8haLIJ3aj1-2my4lpAfP8p66NQWuHx2lRgs1_EtiaAsZtm870oO1TtrcMaY8ewy_JRFE4DXGB-tCIOep-VZAD9dIRRj8teYOfgJINPCNEEeaxvhEW_gT319K4vRWqnX2QFI6VpXzdpdJ4vdk-b5toIr72QX8W9FaSJp0YcSXUg7WgMIJebWe5gc828lbZ6BorzUnYylS1SaRS2tkRyncesOri1FY_fU2Wu6Z2zdYVr3vSOmvMoFtat_Fu2i5sOcMiUSrdyjYitk3dzUj96-WpawROIdgluq_BVtqWi_M2ctryvMsX9boirjiwr7e5fofRUOaOtQeyp4IMn6o1_VoZ7ZQtkrRg_FV7fsr8B2U--zZ4zVRSdMUnfwV_22O3l56WZmU6Vj-QBFhwjQm_VY0qMnoRFQ4p6jUow_y2iauJhU-QBg1Mpi8asSegcMgfMxZ9Vj0lIae2M8QlZbuRW30stezut2k4Xj0s8b_V-nYp7QUusZ4BbaFlc5jnnmmgefhVSX_qYl2-nw_JmRkRpr88B20VnVlUumWvyQ_S1di98y0BQZolmRQvk2eR5F_F8xzpg6y7jfcWqex3R_tWJJpfpo89XswQ6W3q6Qwc0byrBFORYzvw846FJWuQnx3YzcvVqY36zf9vOwMn-xZiuhx9IVSQWtu0gcnlmuh2dfVagq_IWtQV-5sg76JM9swkoVdRQq7-tVUkuzteQgiy2nq_9QzBlkZ1cXIyF2aYrOeJgFf78iYqYqF6_53rcn_WRpZguRzub26tos8iugnRs0RIMQ9u6dZuMZw4OgjF4tf-yolSMtO_XlR'
var igvDiv = document.getElementById("igv_div");
      var options =
        {
            oauthToken: token,
            locus: 'Pf3D7_03_v3:500000',
            reference: {
                "id": "pfalciparum",
                "name": "P. falciparum",
                "fastaURL": "gs://broad-dsde-methods-long-reads/resources/references/plasmodb_release-61/Pfalciparum3D7/fasta/data/PlasmoDB-61_Pfalciparum3D7_Genome.fasta",
                "indexURL": "gs://broad-dsde-methods-long-reads/resources/references/plasmodb_release-61/Pfalciparum3D7/fasta/data/PlasmoDB-61_Pfalciparum3D7_Genome.fasta.fai",
                "tracks": [
                    {
                      "name": "Genes",
                      "url": "gs://broad-dsde-methods-long-reads/resources/references/pfalciparum3D7/PlasmoDB-46_Pfalciparum3D7.gff",
                      "order": 1000000
                    }]
              }
        };

        igv.createBrowser(igvDiv, options)
                .then(function (browser) {
                    console.log("Created IGV browser");
                })
