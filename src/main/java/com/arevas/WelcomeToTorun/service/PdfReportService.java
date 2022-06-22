package com.arevas.WelcomeToTorun.service;

import com.arevas.WelcomeToTorun.domain.Article;
import com.arevas.WelcomeToTorun.domain.Rating;
import com.arevas.WelcomeToTorun.domain.SportTeam;
import com.arevas.WelcomeToTorun.domain.TouristAttraction;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class PdfReportService {

    private static final BaseFont uniFont = createUniFont();
    private static final Font headFont = new Font(uniFont, 18, Font.BOLD);
    private static final Font italicFont = new Font(uniFont, 12, Font.ITALIC);
    private static final Font textFont = new Font(uniFont, 12, Font.NORMAL);
    private static final Font ratingFont = new Font(uniFont, 12, Font.BOLD);
    private static final Chunk linebreak = new Chunk(new LineSeparator());
    private static final Logger logger = LoggerFactory.getLogger(PdfReportService.class);
    private static final Paragraph averageParagraph = setRatingParagraph("Średnia ocena: ", ratingFont);
    private static final Paragraph ratingParagraph = setRatingParagraph("Ostatni komentarz: ", ratingFont);

    public static BaseFont createUniFont() {
        try {
            return BaseFont.createFont("static/TheanoModernRegular-B7Wd.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        } catch (DocumentException | IOException ex) {
            assert logger != null;
            logger.error("Error occurred: {0}", ex);
        }
        return null;
    }

    public static ByteArrayInputStream singleArticleReport(Article article, Double rating, List<Rating> ratingList) {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Paragraph articleTitle = setTitle(article.getTitle(), headFont);
            Image articlePhoto = setPhoto(article.getCoverPhotoURL());
            Paragraph articleBody = setBody(article.getBody(), textFont);

            Phrase averageRating = new Phrase(getAverage(rating), italicFont);
            Paragraph ratingResult = new Paragraph(getComment(ratingList), italicFont);
            ratingResult.setAlignment(Paragraph.ALIGN_JUSTIFIED);

            PdfWriter.getInstance(document, out);
            document.open();
            document.add(articleTitle);
            document.add(articlePhoto);
            document.add(articleBody);
            document.add(linebreak);
            document.add(averageParagraph);
            document.add(averageRating);
            document.add(ratingParagraph);
            document.add(ratingResult);

            document.close();
        } catch (DocumentException | IOException ex) {
            logger.error("Error occurred: {0}", ex);
        }
        return new ByteArrayInputStream(out.toByteArray());
    }

    public static ByteArrayInputStream singleTouristAttractionReport(TouristAttraction touristAttraction, Double rating, List<Rating> ratingList) {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Paragraph touristAttractionTitle = setTitle(touristAttraction.getName(), headFont);
            Image touristAttractionPhoto = setPhoto(touristAttraction.getCoverPhotoURL());
            Paragraph touristAttractionBody = setBody(touristAttraction.getDescription(), textFont);

            Phrase averageRating = new Phrase(getAverage(rating), italicFont);
            Paragraph ratingresult = new Paragraph(getComment(ratingList), italicFont);
            ratingresult.setAlignment(Paragraph.ALIGN_JUSTIFIED);

            PdfPTable table = generateTable();

            PdfPCell hcell;
            hcell = colorColumn("Osiedle", italicFont);
            table.addCell(hcell);

            PdfPCell cell;
            cell = normalColumn(touristAttraction.getEstate(), textFont);
            table.addCell(cell);

            hcell = colorColumn("Ulica", italicFont);
            table.addCell(hcell);

            cell = normalColumn(touristAttraction.getStreet(), textFont);
            table.addCell(cell);

            PdfWriter.getInstance(document, out);
            document.open();
            document.add(touristAttractionTitle);
            document.add(touristAttractionPhoto);
            document.add(touristAttractionBody);
            document.add(linebreak);
            document.add(table);
            document.add(linebreak);
            document.add(averageParagraph);
            document.add(averageRating);
            document.add(ratingParagraph);
            document.add(ratingresult);

            document.close();
        } catch (DocumentException | IOException ex) {
            logger.error("Error occurred: {0}", ex);
        }
        return new ByteArrayInputStream(out.toByteArray());
    }

    public static ByteArrayInputStream singleSportTeamReport(SportTeam sportTeam, Double rating, List<Rating> ratingList) {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            Paragraph sportTeamTitle = setTitle(sportTeam.getName(), headFont);
            Image sportTeamPhoto = setPhoto(sportTeam.getCoverPhotoURL());
            Paragraph sportTeamBody = setBody(sportTeam.getHistory(), textFont);

            Phrase averageRating = new Phrase(getAverage(rating), italicFont);
            Paragraph ratingresult = new Paragraph(getComment(ratingList), italicFont);
            ratingresult.setAlignment(Paragraph.ALIGN_JUSTIFIED);

            PdfPTable table = generateTable();

            PdfPCell hcell;
            hcell = colorColumn("Stadion", italicFont);
            table.addCell(hcell);

            PdfPCell cell;
            cell = normalColumn(sportTeam.getStadium(), textFont);
            table.addCell(cell);

            hcell = colorColumn("Ulica", italicFont);
            table.addCell(hcell);

            cell = normalColumn(sportTeam.getStreet(), textFont);
            table.addCell(cell);

            hcell = colorColumn("Data założenia", italicFont);
            table.addCell(hcell);

            cell = normalColumn(String.valueOf(sportTeam.getYearOfEstablishment()), textFont);
            table.addCell(cell);

            hcell = colorColumn("Barwy klubowe", italicFont);
            table.addCell(hcell);

            cell = normalColumn(sportTeam.getClubColors(), textFont);
            table.addCell(cell);

            hcell = colorColumn("Dyscyplina", italicFont);
            table.addCell(hcell);

            cell = normalColumn(sportTeam.getDiscipline(), textFont);
            table.addCell(cell);

            PdfWriter.getInstance(document, out);
            document.open();
            document.add(sportTeamTitle);
            document.add(sportTeamPhoto);
            document.add(sportTeamBody);
            document.add(linebreak);
            document.add(table);
            document.add(linebreak);
            document.add(averageParagraph);
            document.add(averageRating);
            document.add(ratingParagraph);
            document.add(ratingresult);

            document.close();
        } catch (DocumentException | IOException ex) {
            logger.error("Error occurred: {0}", ex);
        }
        return new ByteArrayInputStream(out.toByteArray());
    }

    public static String getAverage(Double average) {
        if (average.isNaN()) {
            return "Materiał nie został jeszcze oceniony.";
        } else {
            return String.format("%.2f", average);
        }
    }

    public static String getComment(List<Rating> ratingList) {
        if (ratingList.size() == 0) {
            return "Materiał nie posiada jeszcze komentarzy.";
        } else {
            return ratingList.get((ratingList.size() - 1)).toString();
        }
    }

    public static Paragraph setTitle(String title, Font font) {
        Paragraph result = new Paragraph(title, font);
        result.setAlignment(Paragraph.ALIGN_CENTER);
        return result;
    }

    public static Image setPhoto(String url) throws BadElementException, IOException {
        Image result = Image.getInstance(url);
        result.setPaddingTop(20);
        result.setAlignment(Image.ALIGN_CENTER);
        result.scaleToFit(500f, 500f);
        return result;
    }

    public static Paragraph setBody(String body, Font font) {
        Paragraph result = new Paragraph(body, font);
        result.setAlignment(Paragraph.ALIGN_JUSTIFIED);
        return result;
    }

    public static Paragraph setRatingParagraph(String text, Font font) {
        return new Paragraph(text, font);
    }

    public static PdfPTable generateTable() throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(90);
        table.setWidths(new int[]{2, 2});
        return table;
    }

    public static PdfPCell colorColumn(String title, Font font) {
        BaseColor hcellColor = new BaseColor(102, 255, 178, 255);
        PdfPCell hcell = new PdfPCell(new Phrase(title, font));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        hcell.setBackgroundColor(hcellColor);
        return hcell;
    }

    public static PdfPCell normalColumn(String title, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(title, font));
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }
}
