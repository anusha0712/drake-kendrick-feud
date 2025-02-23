# Categorically Visualizing The Drake vs Kendrick Rap Feud 

## Introduction

Hello! My name is Anusha Subramanian and I'm a Data Journalist at Columbia Journalism School. I'm primarily interested in anything that provides critical commentary on the human condition and specifically interested in public health, culture with a South Asian focus, books, poetry and lots and lots of food. You can find my work [here](https://anusha0712.github.io) and this project's completed story [here](https://anusha0712.github.io/drake-kendrick-feud/).

If you were anywhere close to the internet in 2024, Drake and Kendrick Lamar's explosive feud was definitely stuffed down your throat. While I enjoy rap music, I'm not well-versed in the extensive Drake-Kendrick "lore" that true-fans have chronicled all over the internet - a slow burn of simmering tensions that finally erupted with J Cole's incendiary verse in "First Person Shooter" on Drake's album. J. Cole ducked out after a brief stint, but Drake and Kendrick came for each other's throat. 

Kendrick's latest SuperBowl performance of 'Not Like Us' - smashhit success that ironically dethroned Drake's song God's Plan as the fastest song in Hip-Hop history to reach 100 million streams on Spotify - was his magnum opus, with 65,719 fans in attendance (and thousands more virtually) hitting the controversial "A minor" lyric. It made me wonder how we as a nation have been grooving to tragically casual allegations of pedophila, abuse and sexual misconduct, without a care in the world. What exactly are Drake and Kendrick yelling at each other about? What are the topics that seem to hurt the male ego so very much? How do they hit each other where it hurts? And this project was born from the curiosity to quantify that.

## Goals

One of my primary goals for this project was to create a comprehensive database cataloging all the "disses" in Drake and Kendrick's feud. This is my first time undertaking such an extensive database creation and cataloging exercise from scratch. I intentionally chose to do the whole process manually since it gave me better control over categorical nuances and also made sure that no newisms, pop-culture references or extremely subliminal messaging were missed, ensuring more accurate tagging of the disses. 

Beyond that, my aim was to crisply break down the data with visuals that help readers grasp the scale of the battle and the things that the two artists choose to weaponize in their bid to hurt each other. 

Some questions that fueled my exploratory analysis:

1. What categories are they singing about the most?

2. Are there patterns in what they accuse each other of? For example, we know that Kendrick uses Drake's promiscuity with women to undermine his character. Are there similar things that Drake does to Kendrick, categorically? 

3. What is the scale of the feud? How many disses are there actually and is anyone clearly winning in terms of absolute numbers of disses?

4. What kind of derogatory language do the two artists use?

This is a project that will help me build skills on database creation, putting together a dynamic scrollytelling narrative and hone the art of reader-facing visualizations. My maximal goal is to take the readers on a clear, visual journey using data at the heart of the narrative analyse one of the biggest rap battles in history (or at least, the most public).

## Frameworks Used

**Information Gathered**
- Genius Lyrics
- Genius Annotations
- Reddit 
- Music publications like Billboard

**Code**
- Python (pandas)
- R (ggplot2, waffle, tidyverse)
- HTML, CSS, Javascript (website)
- Excel / Google Sheets

**Data Visualization**
- `ggplot2` and `waffle` in R
- Adobe Illustrator


## Quick Guide To The Files

Directories:

1. `charts` : Contains the svg files included in the scrollytelling piece. 

2. `data` : All the raw data files

    a. `drake_kendrick_disses.csv` : Manually gathered database of Kendrick and Data disses with metadata including song name, artist, release date, order of release in the feud, category, subcategory, streaming information and more. 
    
    b. `data_dictionary.csv`: A data dictionary explaining all the variables in the dataset, including categories and subcategories

    b. `grouped_artist.csv` : CSV used to generate the base waffle chart grid

    c. `song_text_files` : Txt files of the 10 songs in the Kendrick-Drake feud. Verses from featuring artists, if any, are omitted.

3. `rap_feud_analysis.ipynb` : Python notebook for preliminary data cleaning

4. `waffle_diss_grid.R` : Code for generating the base waffle chart used in the project


## Methodology 

This is the framework that I used for building my dataset and analysis.

### Building The Database

**1. Choosing the songs**

While tensions have been simmering between Drake and Kendrick for many years now, I made the methodological choice to only focus on the explosion of direct musical confrontation in 2024 which is very well-defined. There are ten main songs - 5 diss tracks each. 

A lot of the songs have verses from other artists. For example, AI generated verses from 2Pac and Snoop Dogg in Drake's song, Taylor Made Freestyle. Any verses that are not directly sung/rapped by Kendrick and Drake are excluded. Furthermore, the feud was bigger than just Drake vs Kendrick. A lot of other artists like J Cole, The Weeknd, Metro Boomin, Rick Ross etc. got pulled into it too for various reasons. Any of Drake or Kendrick's disses to other artists that is not relevant directly to Drake or Kendrick has been excluded. I want to emphasise that this is a database of conspicuous incidents of insulting each other directly. 

Both of them are talented rappers with often extraordinary turns of phrases with multi-level subtext. When such a bar or verse obviously belongs to more than one category, it can appear a maximum number of two times in the dataset - but only if that one bar importantly encodes two wildly different main categories (not subcategories). This was done because music is fluid and poetic, and force encoding just one category when the artist clearly meant to cleverly convey multiple tiers of insults, would reduce the essence of the dataset.

**2. Categorising disses**

The first step was to come up with the categories. To do so, I used [genius.com](genius.com) to read through all the ten songs. 

Genius.com is famous for it's community annotations where users contribute their knowledge of artists, easter eggs, lyrical interpretations, background context, similarity between other songs, musical theory and artistic collaborations. Annotations are "unverified" until edited and accepted by "Editors". According to the website, "a Genius Editor is a contributor who has proven that they can consistently contribute high-quality annotations, song bios, album bios, and artist bios."

The 10 feudal songs are extensively annotated, both verified and unverified. They provide much needed context to understand the intent behind a lyric, especially ones that seem innocuous to first time readers. My research into the songs and each lyric involved reading every annotation on the 10 songs, articles from musical publications such as Billboard and also Reddit deep-dives to check popular understanding of difficult-to-parse verses. I do have good domain emphasis even separate from this which helped me parse what might be an over analysed opinion of a fan and what is an actually accurate explanation. This is specially true in the case of Kendrick, who has the reputation of a poetically including multi-layered lyrics with meanings that need to be peeled back, armed with context. 

This gave me a basic understanding of some major themes in the song. I came up with a categorization matrix and split them up into subcategories according to what I felt were the major sub-themes. This was the starting point. As I went row by row, I was able to adjust, refine, redefine, create and remove categories until I was happy with the final results. Once you begin, you start to notice consistent patterns in themes and subcategories evolve. This and my research gives me the confidence that I've accurately captured most themes discusses in this feud. 

I split each songs into single disses. At the minimum, they are one line. At the maximum, they are 2-3 lines. The only cases in which one diss spans multiple lines is if the initial lines are not understandable as a diss without the following lines and they work in combination to create an overarching insult. 

### Analysis 

Analysis involved group and transforming data to break it up into the different categories. My research into the lyrics while building the data base provided me the in-depth context required to write the piece. 

Visualizations were made using `R` and then recoloring them per category, per artist to compare trends in dissing. 

## Limitations - "Wants" vs "Needs"

Rap is an art form. There are a lot of lyrics that are extremely subjective and hence could be categorized in multiple ways according to preference. While I believe that the categories I've chosen accurately reflect most, if not all of the data - a whole different set of categories could be picked based on organization. For example, I chose to organize assaults on Character as Moral or Behavioural judgements (one category) and also as judgements on Cultural Authenticity (second category for when the two artists call each other enough for appropriating Black culture inauthentically). But another creator could reorganize this into one larger category or any other such options. 

In terms of the project goals, my main aim for to create such a database for analysis and also really clearly communicate my story. Since I created the database myself, I found myself being uniquely attached to it and wanting to represent every single aspect of it to readers. This has the potential to get really complicated and confuse the readers with multiple unorganized pieces of information. To combat this, I took a hard stance on prioritising simplicity, lowering cognitive load and understanding in formulating my reader-facing narrative. I achieved what I needed to but given the time, I would have loved to get into the nitty-gritties of my subcategories and tell a story through those too. I chose to but those on the backburner for the sake of a clear visual story based on the broader main categories only. 


## Note on AI use

Most of the work in this project was done manually by me, including gathering data points, categorizing them and creating multiple, recolored versions of the waffle chart on Illustrator to reflect different topics after using R to generate the base grid. 

Claude AI was used to polish an existing scrollytelling template to my specifications and debugging some HTML related problems. 


## Questions

I would love to chat more about my work, including this project! If you have any questions, please [email me!](mailto:as7500@columbia.edu)


    



