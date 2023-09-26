import numpy as np
import pandas as pd
import random as rnd
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
import plotly.express as px
import plotly.graph_objects as go
import jinja2
import os
import argparse
import line_profiler

def parse_coverage(bam_file):
    # Open gzipped file
    df = pd.read_csv("test_data/m64386e_230614_195306.coverage.chr2.regions.bed.gz", delimiter="\\t", names=['contig','start','stop','coverage'])
    trim_df = df.head(500)
    x_stop = trim_df['stop']
    y_depth = trim_df['coverage']
    contig = trim_df['contig'][0]

    return [x_stop, y_depth, contig]

def create_plot(directory):

    # only looking for .bed.gz files
    ext = (".bed.gz")

    # set up dictionary for each bed DF
    # beds = {}

    fig = go.Figure()

    # debug -- try 5 files first
    file_list = os.listdir(directory)[:5]
    # iterate over each bed.gz in test_data folder
    for file in file_list:

        if file.endswith(ext):

            # reading current .bed.gz file
            f = os.path.join(directory, file)
            print(f)

            # create DataFrame per .bed.gz
            bed_df = pd.read_csv(f, delimiter="\\t", names=["contig", "start", "stop", "depth"], engine="python")
            
            # downsample each DataFrame to 1000 "bins"
            bed_downsampled = bed_df.groupby(bed_df.index // 5000).sum()[:-1]

            # create line traces for current downsampled bed file
            name = bed_df["contig"][0]
            print(name)
            print(len(bed_downsampled))

            fig = fig.add_trace(go.Scatter(
            x = bed_downsampled["stop"],
            y = bed_downsampled["depth"],
            name = name,
            showlegend=False
            ))

    fig.update_layout(
        autosize=False,
        width=900,
        height=700,
        xaxis=dict(
            title="Stop Position (bp)"
        ),
        yaxis=dict(
            title="Depth"
        ))

    fig.show()

# new binning - continuous plotting
# @profile
def create_plot_v2(directory):
    # placeholder plot
    fig, ax = plt.subplots(1,1)
    fig = go.Figure()

    # constant bin width so that each contig fits together
    bin_width = 10000

    # only looking for .bed.gz files
    ext = (".bed.gz")

    # set up DF to hold all data
    beds = pd.DataFrame(columns={"stop", "depth"})

    # debug -- try 5 files first
    file_list = os.listdir(directory)[:2]
    print(f"Files to be plotted: {file_list}")

    # iterate over each bed.gz in test_data folder
    for idx, file in enumerate(file_list):

        if file.endswith(ext):
            # reading current .bed.gz file
            f = os.path.join(directory, file)
            print(f"{idx} Current file: {f}")

            # create DataFrame per .bed.gz
            bed_df = pd.read_csv(f, delimiter="\\t", names=["contig", "start", "stop", "depth"], engine="python")
            
            # get bins
            print("Getting bins...")
            start_min = bed_df["start"].min()
            stop_max = bed_df["stop"].max()
            bins = np.arange(start_min, stop_max+1, bin_width)
            values = np.zeros(len(bins)) # preallocation
            print(f"Max Pos: {stop_max}")

            # iterrate through each DataFrame and populate bins
            print("Populating bins...")
            for _, row in bed_df.iterrows():
                avg = (row["stop"]+row["start"])/2
                index = int(np.floor(avg/bin_width))
                values[index]+=row["depth"]

            # Check if data has already been added to DF
            if idx == 0:
                print(f"{idx} == 0")
                result = pd.DataFrame({"stop":bins, "depth":values})
                beds = beds.append(result)
            else:
                print(f"{idx} =/= 0")
                result = pd.DataFrame({"stop":bins+max(result["stop"]), "depth":values})
                beds = beds.append(result)
    
    # Fix index and plot final data
    beds = beds.reset_index().drop("index", axis=1)
    #ax.plot(beds["stop"], beds["depth"], "or")
    return beds


def generate(plots):
    templateLoader = jinja2.FileSystemLoader(searchpath='./')
    templateEnv = jinja2.Environment(loader=templateLoader)
    TEMPLATE_FILE = './coverage_plot_test.html' # may need to change if file is moved
    template = templateEnv.get_template(TEMPLATE_FILE)
    output = template.render(plots=plots)
    
    with open('./plot_test', 'w') as fh:
        fh.write(output)   

class Plots:
    def __init__(self, coverage_info):
        self.coverage_data = coverage_info

if __name__ == "__main__":
    # set up LineProfiler
    # profile = LineProfiler(create_plot)

    # define parser object
    parser = argparse.ArgumentParser()

    # required inputs
    parser.add_argument("--bed_dir", help="path to folder containing files for coverage plot", required=True)
    args = parser.parse_args()

    # parse arguments
    arg_dict = vars(args)
    create_plot_v2(arg_dict['bed_dir'])

    # call report generation
    #plots = Plots(coverage_plot)
    #generate(plots)
     
