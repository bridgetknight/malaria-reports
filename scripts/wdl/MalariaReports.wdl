version 1.0

task RunReportScript {

    meta {
        description: "Use RunReportScript to start the report generation process."
    }

    input {
        Int mem_gb
        String docker_image
    }

    command {
        python3 ../report_gen.py ${mem_gb}
    }

    output {
        File analysis = "analysis_report.html"
        File summary = "summary_report.html"
    }
    
    runtime {
        docker: ${docker_image}
        memory: mem_gb + "GB"
    }
    
}