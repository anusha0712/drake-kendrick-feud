library(ggplot2)
library(waffle)
library(ggtext)
library(showtext)
library(readr)

# getting website fonts here for visual uniformity 
font_add_google("Space Grotesk", "space_grotesk") 
showtext_auto()

data <- read_csv("data/grouped_artist.csv")

p <- ggplot(data, aes(fill = Artist, values = count))+
  geom_waffle(na.rm=TRUE, n_rows=24, flip=F, size = 3, colour = "#111111",  
              radius = unit(5, "pt")) +
  coord_equal()+
  guides(fill='none')+
  scale_fill_manual(values=c("#DB9D47", "#7851A9"))+ # using same legend throughout
  theme_void()+
  theme(
    plot.background = element_rect(fill=NA, color=NA),
    plot.margin = margin(1, 1, 1, 1, "cm"),
    
    plot.title = element_markdown(
      size=25,
      family='space_grotesk',
      color="white",
      face="bold",
      hjust = 0.5
    ),
    
    strip.text = element_markdown(
      hjust=0.5,
      size=10,
      family='space_grotesk',
      angle=90,
      margin=margin(0,0,0,0,'cm'),
      lineheight = 0.45,
      color="white"
    )
  ) +
  labs(title = "Universe of Insults")  


ggsave("charts/all_categories.svg", plot=p, width=720/72, height=720/72, dpi=100, bg = "transparent")