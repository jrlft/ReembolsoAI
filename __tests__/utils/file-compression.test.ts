import { compressFile } from "@/lib/utils/file-compression"

describe("File Compression", () => {
  it("should compress file to under 900KB", async () => {
    // Mock large file
    const largeFile = new File(["x".repeat(2000000)], "large.jpg", {
      type: "image/jpeg",
    })

    const compressedFile = await compressFile(largeFile, 900)

    expect(compressedFile.size).toBeLessThanOrEqual(900 * 1024)
    expect(compressedFile.name).toBe("large.jpg")
    expect(compressedFile.type).toBe("image/jpeg")
  })

  it("should maintain file under limit if already small", async () => {
    const smallFile = new File(["small content"], "small.jpg", {
      type: "image/jpeg",
    })

    const result = await compressFile(smallFile, 900)

    expect(result.size).toBeLessThanOrEqual(900 * 1024)
  })
})
